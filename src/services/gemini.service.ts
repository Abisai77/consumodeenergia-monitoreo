
import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { DailyConsumption } from '../models/data.models';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;
  
  constructor() {
    // IMPORTANT: The API key is sourced from environment variables.
    // Do not hardcode or expose it in the frontend.
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      console.error("API_KEY no encontrada. Asegúrate de que esté configurada en las variables de entorno.");
    }
  }

  async getSavingTips(consumptionData: DailyConsumption[]): Promise<string> {
    if (!this.ai) {
      return Promise.reject(new Error("Gemini AI client no está inicializado. Falta la API Key."));
    }

    const relevantData = consumptionData.filter(d => d.kwh > 0).map(d => `Día ${d.day}: ${d.kwh} kWh`).join(', ');
    const prompt = `
      Basado en los siguientes datos de consumo eléctrico diario en un hogar (${relevantData}), 
      genera 3 consejos cortos, prácticos y accionables en español para reducir la factura de luz. 
      Formatea los consejos como una lista con viñetas. No incluyas un título o introducción, solo la lista.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error('Error al generar consejos con Gemini:', error);
      throw new Error('No se pudieron generar los consejos. Inténtalo de nuevo más tarde.');
    }
  }
}

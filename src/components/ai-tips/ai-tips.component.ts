
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { DailyConsumption } from '../../models/data.models';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-ai-tips',
  standalone: true,
  template: `
    <div class="h-full flex flex-col">
      <div class="flex items-start">
        <div class="p-2 bg-yellow-500/20 rounded-lg mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-slate-100">Consejos de Ahorro con IA</h3>
          <p class="text-sm text-slate-400">Obtén recomendaciones personalizadas para reducir tu factura de luz.</p>
        </div>
      </div>

      <div class="flex-grow my-6 text-sm text-slate-300">
        @switch (state()) {
          @case ('idle') {
            <p>Presiona el botón para obtener consejos de ahorro basados en tu consumo actual.</p>
          }
          @case ('loading') {
            <div class="flex items-center justify-center h-full">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generando consejos...</span>
            </div>
          }
          @case ('success') {
            <div [innerHTML]="tips()" class="prose prose-sm prose-invert prose-p:my-2 prose-ul:my-0 prose-li:my-1 text-slate-300"></div>
          }
          @case ('error') {
            <p class="text-red-400">{{ error() }}</p>
          }
        }
      </div>

      <button (click)="generateTips()" [disabled]="state() === 'loading'" class="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
        Generar Consejos
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiTipsComponent {
  consumptionData = input.required<DailyConsumption[]>();
  private geminiService = inject(GeminiService);

  state = signal<LoadingState>('idle');
  tips = signal('');
  error = signal('');

  async generateTips() {
    this.state.set('loading');
    this.error.set('');
    try {
      const result = await this.geminiService.getSavingTips(this.consumptionData());
      // A simple conversion of markdown list to HTML list for display
      const htmlResult = '<ul>' + result.trim().split('\n').map(item => `<li>${item.replace(/^- /, '')}</li>`).join('') + '</ul>';
      this.tips.set(htmlResult);
      this.state.set('success');
    } catch (err: any) {
      this.error.set(err.message || 'Ocurrió un error inesperado.');
      this.state.set('error');
    }
  }
}

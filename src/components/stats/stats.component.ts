
import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { Stats } from '../../models/data.models';

@Component({
  selector: 'app-stats',
  standalone: true,
  template: `
    @if (stats()) {
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Consumo Actual -->
        <div class="bg-slate-800 p-5 rounded-xl flex justify-between items-start">
          <div>
            <p class="text-sm text-slate-400">Consumo Actual</p>
            <p class="text-3xl font-bold text-slate-100 mt-2">
              {{ stats()?.currentConsumption }} <span class="text-xl font-medium">W</span>
            </p>
          </div>
          <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div class="w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
        </div>
        <!-- Consumo Hoy -->
        <div class="bg-slate-800 p-5 rounded-xl flex justify-between items-start">
          <div>
            <p class="text-sm text-slate-400">Consumo Hoy</p>
            <p class="text-3xl font-bold text-slate-100 mt-2">
              {{ stats()?.todayConsumption }} <span class="text-xl font-medium">kWh</span>
            </p>
          </div>
          <div class="w-10 h-10 rounded-full bg-slate-700"></div>
        </div>
        <!-- Costo Estimado Mensual -->
        <div class="bg-slate-800 p-5 rounded-xl flex justify-between items-start">
          <div>
            <p class="text-sm text-slate-400">Costo Estimado Mensual</p>
            <p class="text-3xl font-bold text-slate-100 mt-2">
              {{ formattedCost() }} <span class="text-xl font-medium">CLP</span>
            </p>
          </div>
          <div class="w-10 h-10 rounded-full bg-slate-700"></div>
        </div>
        <!-- Emisiones de CO2 Hoy -->
        <div class="bg-slate-800 p-5 rounded-xl flex justify-between items-start">
          <div>
            <p class="text-sm text-slate-400">Emisiones de CO₂ Hoy</p>
            <p class="text-3xl font-bold text-slate-100 mt-2">
              {{ stats()?.todayCo2 }} <span class="text-xl font-medium">kg</span>
            </p>
          </div>
          <div class="w-10 h-10 rounded-full bg-slate-700"></div>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
  stats = input.required<Stats>();
  
  // Logic must be in TS, not template
  formattedCost = computed(() => {
    const cost = this.stats()?.estimatedCost;
    if (cost) {
      return cost.toLocaleString('es-CL');
    }
    return '0';
  });
}

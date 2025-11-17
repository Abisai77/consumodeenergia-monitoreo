
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="flex flex-col sm:flex-row justify-between sm:items-center">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-3 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5.268l4.268-4.268a1 1 0 011.414 1.414L13.414 8.682l4.268 4.268a1 1 0 01-1.414 1.414L12 10.096V15a1 1 0 01-1.707.707l-8-8a1 1 0 010-1.414l8-8A1 1 0 0111.3 1.046zM4.783 8L11 14.217V1.783L4.783 8z" clip-rule="evenodd" />
          </svg>
          Panel de Consumo Eléctrico - Hogar
        </h1>
        <p class="text-slate-400 mt-1">Monitoreo y gestión en tiempo real para su hogar en Chile.</p>
      </div>
      <div class="flex items-center space-x-3 mt-4 sm:mt-0">
        <span class="text-sm font-medium text-slate-300">Modo Alto Consumo</span>
        <button 
          (click)="toggleMode()"
          [class]="highConsumptionMode() ? 'bg-cyan-500' : 'bg-slate-600'"
          class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500">
          <span
            [class]="highConsumptionMode() ? 'translate-x-5' : 'translate-x-0'"
            class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
        </button>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  highConsumptionMode = signal(false);

  toggleMode() {
    this.highConsumptionMode.update(value => !value);
  }
}

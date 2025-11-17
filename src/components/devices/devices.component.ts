
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Device } from '../../models/data.models';

@Component({
  selector: 'app-devices',
  standalone: true,
  template: `
    <div class="bg-slate-800 p-6 rounded-xl">
      <div class="flex items-center mb-6">
        <div class="p-1.5 bg-slate-700 rounded-md mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5z" clip-rule="evenodd" />
            </svg>
        </div>
        <h3 class="text-xl font-semibold text-slate-100">Dispositivos Conectados</h3>
      </div>
      
      <div class="space-y-2">
        @for (device of devices(); track device.id) {
          <div class="grid grid-cols-2 md:grid-cols-5 items-center p-4 bg-slate-900/50 rounded-lg gap-4">
            <div class="md:col-span-1 font-semibold text-slate-200">
              {{ device.name }}
            </div>

            <div class="md:col-span-1 text-right md:text-left">
              <p class="text-xs text-slate-400">Ahora</p>
              <p class="font-medium text-slate-200">{{ device.currentPower }} W</p>
            </div>
            
            <div class="md:col-span-1">
              <p class="text-xs text-slate-400">Hoy</p>
              <p class="font-medium text-slate-200">{{ device.todayKwh }} kWh</p>
            </div>
            
            <div class="md:col-span-1">
              <p class="text-xs text-slate-400 mb-1">Actividad (24h)</p>
              <div class="flex items-end h-6 space-x-px">
                @for (act of device.activity; track $index) {
                   <div class="w-1.5 bg-slate-600" [style.height.%]="act * 100"></div>
                }
              </div>
            </div>

            <div class="md:col-span-1 flex flex-col items-end">
              <p class="text-xs text-slate-400 mb-1">Acción</p>
              <button 
                (click)="toggleDevice(device.id)"
                [class]="device.active ? 'bg-emerald-500' : 'bg-slate-600'"
                class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500">
                <span
                  [class]="device.active ? 'translate-x-5' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent {
  devices = input.required<Device[]>();
  deviceToggled = output<number>();

  toggleDevice(id: number) {
    this.deviceToggled.emit(id);
  }
}

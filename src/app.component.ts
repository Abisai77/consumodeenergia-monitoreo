
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { StatsComponent } from './components/stats/stats.component';
import { ConsumptionChartComponent } from './components/consumption-chart/consumption-chart.component';
import { AiTipsComponent } from './components/ai-tips/ai-tips.component';
import { DevicesComponent } from './components/devices/devices.component';
import { DailyConsumption, Device, Stats } from './models/data.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    HeaderComponent,
    StatsComponent,
    ConsumptionChartComponent,
    AiTipsComponent,
    DevicesComponent,
  ],
})
export class AppComponent {
  stats = signal<Stats>({
    currentConsumption: 191,
    todayConsumption: 4.25,
    estimatedCost: 51076,
    todayCo2: 1.3,
  });

  dailyConsumption = signal<DailyConsumption[]>([
    { day: 1, kwh: 12 }, { day: 2, kwh: 11.5 }, { day: 3, kwh: 11 }, { day: 4, kwh: 15 }, { day: 5, kwh: 18 },
    { day: 6, kwh: 21 }, { day: 7, kwh: 16 }, { day: 8, kwh: 11.8 }, { day: 9, kwh: 17 }, { day: 10, kwh: 16.5 },
    { day: 11, kwh: 21.5 }, { day: 12, kwh: 15.5 }, { day: 13, kwh: 18.5 }, { day: 14, kwh: 22 }, { day: 15, kwh: 17.5 },
    { day: 16, kwh: 6 }, { day: 17, kwh: 0 }, { day: 18, kwh: 0 }, { day: 19, kwh: 0 }, { day: 20, kwh: 0 },
    { day: 21, kwh: 0 }, { day: 22, kwh: 0 }, { day: 23, kwh: 0 }, { day: 24, kwh: 0 }, { day: 25, kwh: 0 },
    { day: 26, kwh: 0 }, { day: 27, kwh: 0 }, { day: 28, kwh: 0 }, { day: 29, kwh: 0 }, { day: 30, kwh: 0 }
  ]);
  
  devices = signal<Device[]>([
    { id: 1, name: 'Refrigerador', currentPower: 140.9, todayKwh: 1.35, active: true, activity: [0.8, 0.7, 0.9, 0.6, 0.8, 0.7, 0.9, 0.6, 0.8, 0.7, 0.9, 0.6] },
    { id: 2, name: 'TV Living', currentPower: 5.2, todayKwh: 0.45, active: false, activity: [0.1, 0.2, 0.5, 0.6, 0.3, 0.1, 0.0, 0.0, 0.0, 0.4, 0.5, 0.2] },
    { id: 3, name: 'Luces Cocina', currentPower: 44.6, todayKwh: 0.30, active: true, activity: [0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.6, 0.8, 0.7, 0.3, 0.1, 0.0] },
    { id: 4, name: 'Computador', currentPower: 0.5, todayKwh: 2.15, active: false, activity: [0.2, 0.3, 0.4, 0.8, 0.9, 1.0, 0.9, 0.5, 0.3, 0.1, 0.0, 0.0] },
  ]);

  handleDeviceToggle(deviceId: number) {
    this.devices.update(devices =>
      devices.map(device =>
        device.id === deviceId ? { ...device, active: !device.active } : device
      )
    );
  }
}

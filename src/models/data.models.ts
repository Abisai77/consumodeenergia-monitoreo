
export interface Stats {
  currentConsumption: number;
  todayConsumption: number;
  estimatedCost: number;
  todayCo2: number;
}

export interface DailyConsumption {
  day: number;
  kwh: number;
}

export interface Device {
  id: number;
  name: string;
  currentPower: number;
  todayKwh: number;
  active: boolean;
  activity: number[]; // Array of 12 values (0 to 1) representing 2-hour blocks
}


import { ChangeDetectionStrategy, Component, ElementRef, AfterViewInit, ViewChild, input, OnChanges, SimpleChanges } from '@angular/core';
import { DailyConsumption } from '../../models/data.models';

// This is to inform TypeScript about the global d3 object from the CDN
declare var d3: any;

@Component({
  selector: 'app-consumption-chart',
  standalone: true,
  template: `
    <h2 class="text-xl font-semibold text-slate-100">Consumo Diario del Mes</h2>
    <p class="text-sm text-slate-400">Total kWh por día</p>
    <div class="flex justify-end items-center space-x-4 mt-2 mb-4 text-xs">
        <div class="flex items-center"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span>Bajo</div>
        <div class="flex items-center"><span class="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-2"></span>Medio</div>
        <div class="flex items-center"><span class="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></span>Alto</div>
    </div>
    <div #chartContainer class="w-full h-72"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsumptionChartComponent implements AfterViewInit, OnChanges {
  data = input.required<DailyConsumption[]>();

  @ViewChild('chartContainer') private chartContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.createChart();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
      if (changes['data'] && this.chartContainer) {
          this.createChart();
      }
  }

  private createChart(): void {
    const data = this.data();
    if (!data || data.length === 0 || !this.chartContainer) return;
    
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove(); // Clear previous chart

    const margin = { top: 20, right: 0, bottom: 30, left: 0 };
    const width = element.offsetWidth - margin.left - margin.right;
    const height = element.offsetHeight - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.day.toString()))
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d: DailyConsumption) => d.kwh)])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickValues(x.domain().filter((d,i) => !((i+1) % 2) || (i+1) === 1 )))
      .selectAll('text')
      .style('fill', '#94a3b8'); // text-slate-400
      
    svg.selectAll(".domain").remove(); // Remove axis lines
    svg.selectAll("line").remove(); // Remove ticks

    const colorScale = (val: number) => {
      if (val < 15) return '#10b981'; // emerald-500
      if (val < 20) return '#eab308'; // yellow-500
      return '#ef4444'; // red-500
    };

    svg.selectAll('rect')
      .data(data.filter(d => d.kwh > 0)) // Only draw bars for days with consumption
      .enter()
      .append('rect')
      .attr('x', (d: DailyConsumption) => x(d.day.toString()))
      .attr('y', (d: DailyConsumption) => y(d.kwh))
      .attr('width', x.bandwidth())
      .attr('height', (d: DailyConsumption) => height - y(d.kwh))
      .attr('fill', (d: DailyConsumption) => colorScale(d.kwh))
      .attr('rx', 2)
      .attr('ry', 2);

    // Add today's bar with a different color
    const todayData = data.find(d => d.kwh > 0 && data.find(n => n.day === d.day + 1)?.kwh === 0);
    if(todayData) {
        svg.append('rect')
           .attr('x', x(todayData.day.toString()))
           .attr('y', y(todayData.kwh))
           .attr('width', x.bandwidth())
           .attr('height', height - y(todayData.kwh))
           .attr('fill', '#22d3ee') // cyan-400
           .attr('rx', 2)
           .attr('ry', 2);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  SingleSeries,
  MultiSeries,
  BubbleChartMultiSeries, BoxChartMultiSeries, TreeMapData
} from '@swimlane/ngx-charts';
import { formatLabel, escapeLabel } from '@swimlane/ngx-charts';
import chartGroups from './models/chartTypes';
import { single, multi, boxData, bubble, treemap, generateData } from './models/data';
import { DataService } from "./data-service/data-service.component";
import { BaseChartComponent } from "@swimlane/ngx-charts/lib/common/base-chart.component";
import { ChartOptions } from "./models/chart-options";

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });

@Component({
  selector: 'app-chart-builder',
  templateUrl: './chart-builder.component.html',
  styleUrls: ['./chart-builder.component.css']
})
export class ChartBuilderComponent implements OnInit {

  options: ChartOptions = new ChartOptions();


  theme = 'dark';
  chart: BaseChartComponent & ChartOptions;
  chartType: string = 'bar-vertical';
  chartGroups: any = chartGroups;


  // Data types
  single: SingleSeries = single;
  multi: MultiSeries = multi;
  bubble: BubbleChartMultiSeries = bubble;
  boxData: BoxChartMultiSeries = boxData;
  treemap: TreeMapData = treemap;

  dateData: any[] = generateData(5, false);
  calendarData: any[];
  dateDataWithRange: any[] = generateData(2, true);
  statusData: any[];

  linearScale: boolean = false;
  range: boolean = false;

  view: [700, 300];

  constructor(private dataService: DataService) {
    this.calendarData = this.dataService.getCalendarData();
    this.statusData = this.dataService.getStatusData();
  }

  ngOnInit(): void {
    this.setColorScheme('cool');
    this.selectChart(this.chartType);
  }


  select(data) {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  activate(data) {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  deactivate(data) {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  setColorScheme(name) {

    this.options.colorScheme = this.options.colorSets.find(s => s.name === name);
    this.options.selectedColorScheme = this.options.colorScheme;
    console.log(this.options.colorScheme);
  }

  dblclick(event) {
    console.log('Double click', event);
  }

  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">$${val}</span>
    `;
  }

  valueFormatting(value: number): string {
    return `${Math.round(value).toLocaleString()} €`;
  }

  currencyFormatting(value: number) {
    return `\$${Math.round(value).toLocaleString()}`;
  }

  gdpLabelFormatting(c) {
    return `${escapeLabel(c.label)}<br/><small class="number-card-label">GDP Per Capita</small>`;
  }

  calendarAxisTickFormatting(mondayString: string) {
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth() ? monthName.format(nextSunday) : '';
  }

  calendarTooltipText(c): string {
    return `
      <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data.toLocaleString()}</span>
    `;
  }

  selectChart(chartSelector) {
    this.chartType = chartSelector = chartSelector.replace('/', '');

    for (const group of this.chartGroups) {
      this.chart = group.charts.find(x => x.selector === chartSelector);
      if (this.chart) break;
    }

    this.view = [700, 300];

    this.linearScale = false;
  }

  getInterpolationType(curveType) {
    return this.options.curves[curveType] || this.options.curves['default'];
  }

  updateChartTypes(selectedInputFormat: string) {
    this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .forEach(chart => chart.visible = selectedInputFormat == chart.inputFormat)
  }
}

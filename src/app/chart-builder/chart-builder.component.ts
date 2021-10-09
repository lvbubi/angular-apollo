import { Component, OnInit } from '@angular/core';
import {
  SingleSeries,
  MultiSeries,
  BubbleChartMultiSeries, BoxChartMultiSeries, TreeMapData
} from '@swimlane/ngx-charts';
import chartGroups from './models/chartTypes';
import { single, multi, boxData, bubble, treemap, generateData } from './models/data';
import { DataService } from "./data-service/data-service.component";
import { BaseChartComponent } from "@swimlane/ngx-charts/lib/common/base-chart.component";
import { ChartOptions } from "./models/chart-options";


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

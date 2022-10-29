import {Component, ViewChild} from '@angular/core';
import chartGroups from './chartTypes';
import { colorSets } from "@swimlane/ngx-charts";
import { BaseChartComponent } from "@swimlane/ngx-charts/lib/common/base-chart.component";
import { ChartOptions, Configuration } from "chart-adapter";

import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-chart-builder',
  templateUrl: './chart-builder.component.html',
  styleUrls: ['./chart-builder.component.css']
})
export class ChartBuilderComponent {

  @ViewChild('matStepper', { static: false }) matStepper: MatStepper;

  data: any;

  configuration: Configuration = {
    chartType: 'bar-vertical',
    chartOptions: new ChartOptions(),
    view: [700, 300]
  };

  chart: BaseChartComponent & ChartOptions;


  linearScale: boolean = false;
  range: boolean = false;
  theme = 'dark';

  constructor() {
    this.configuration.chartOptions.colorScheme = this.findColorScheme('cool');
    this.selectChartObservable(this.configuration.chartType);
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

  findColorScheme(name) {
    return colorSets.find(s => s.name === name);
  }

  selectChartObservable(chartType: string) {
    console.log('select observable chart', chartType);
    chartType = chartType.replace('/', '');

    for (const group of chartGroups) {
      this.chart = group.charts.find(x => x.selector === chartType);
      if (this.chart) break;
    }

    this.linearScale = false;
  }

  selectResults(result: any) {
    if (result) {
      this.data = result();
      console.log('select datasource', this.data);
    }
  }

  selectChartType(chartType: string) {
    console.log('selectChartType', chartType);
    this.configuration.chartType = chartType;
  }
}

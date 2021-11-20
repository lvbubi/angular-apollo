import { Component } from '@angular/core';
import chartGroups from './chartTypes';
import { colorSets } from "@swimlane/ngx-charts";
import { BaseChartComponent } from "@swimlane/ngx-charts/lib/common/base-chart.component";
import { ChartOptions, Configuration } from "chart-adapter";
import { Store } from "@ngrx/store";
import { State } from "./store/chart.reducer";
import { ChartActions } from "./store/chart.actions";
import * as _ from 'lodash';
import {chartTypeSelector} from "./store/chart.selectors";

@Component({
  selector: 'app-chart-builder',
  templateUrl: './chart-builder.component.html',
  styleUrls: ['./chart-builder.component.css']
})
export class ChartBuilderComponent {
  private chartGroups: any = chartGroups;

  chartType: string = 'bar-vertical';
  options: ChartOptions = new ChartOptions();

  configuration: Configuration = {
    chartType: this.chartType,
    chartOptions: this.options,
    dataMapper: undefined,
    view: [700, 300]
  };

  theme = 'dark';
  chart: BaseChartComponent & ChartOptions;

  data: any;

  linearScale: boolean = false;
  range: boolean = false;

  constructor(private store: Store<State>) {
    this.store.dispatch(new ChartActions.SetChartGroupsAction(_.cloneDeep(this.chartGroups)));
    this.store.dispatch(new ChartActions.SetConfigurationAction(_.cloneDeep(this.configuration)));

    this.store.select(chartTypeSelector).subscribe(chartType => {
      console.log('chartType changes subscribe', chartType);
      this.selectChartObservable(chartType)
    });

    this.options.colorScheme = this.findColorScheme('cool');
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

  selectChart(chartSelector) {
    console.log('select chart', chartSelector);

    for (const group of this.chartGroups) {
      this.chart = group.charts.find(x => x.selector === chartSelector);
      if (this.chart) {
        console.log('found');
        break;
      }
    }

    this.linearScale = false;
  }

  selectChartObservable(chartType: string) {
    console.log('select observable chart', chartType);
    chartType = chartType.replace('/', '');

    for (const group of this.chartGroups) {
      this.chart = group.charts.find(x => x.selector === chartType);
      if (this.chart) break;
    }

    this.linearScale = false;
  }

  selectResults(result: any) {
    if (result) {
      console.log('select datasource', result());
      this.data = result();
    }
  }

  updateStore(event: any) {
    console.log(event);
    switch (event.previouslySelectedIndex) {
      case 0:
        console.log('chartType collapsed');
        this.store.dispatch(new ChartActions.SetChartTypeAction(this.chartType));
        break;
      case 1:
        console.log('options collapsed');
        break;
      case 2:
        console.log('export collapsed');
        break;
    }
  }
}

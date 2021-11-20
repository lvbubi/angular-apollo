import { Component, OnInit } from '@angular/core';
import chartGroups from './chartTypes';
import { colorSets } from "@swimlane/ngx-charts";
import { BaseChartComponent } from "@swimlane/ngx-charts/lib/common/base-chart.component";
import { ChartOptions, Configuration } from "chart-adapter";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { chartTypeSelector, configurationSelector } from "./store/chart.selectors";
import { State } from "./store/chart.reducer";
import { ChartActions } from "./store/chart.actions";
import * as _ from 'lodash';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-chart-builder',
  templateUrl: './chart-builder.component.html',
  styleUrls: ['./chart-builder.component.css']
})
export class ChartBuilderComponent {
  private chartGroups: any = chartGroups;

  $options: Observable<ChartOptions>;
  $chartType: Observable<string>;
  $configuration: Observable<Configuration>;

  theme = 'dark';
  chart: BaseChartComponent & ChartOptions;

  data: any;

  linearScale: boolean = false;
  range: boolean = false;

  constructor(private store: Store<State>) {
    this.$configuration = this.store.select(configurationSelector);
    this.$options = this.$configuration.pipe(map(x => x.chartOptions));

    this.$chartType = this.store.select(chartTypeSelector);
    this.$chartType.subscribe(chartType => this.selectChartObservable(chartType));
    this.store.dispatch(new ChartActions.SetChartTypeAction('bar-vertical'));
    this.store.dispatch(new ChartActions.SetChartGroupsAction(_.cloneDeep(this.chartGroups)));
    this.store.dispatch(new ChartActions.SetColorSchemeAction(this.findColorScheme(colorSets, 'cool')));
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

  findColorScheme(colorSets, name) {
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
    console.log('select datasource', result());
    this.data = result();
  }
}

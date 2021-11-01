import { Component, OnInit } from '@angular/core';
import chartGroups from './chartTypes';
import { BaseChartComponent } from "@swimlane/ngx-charts/lib/common/base-chart.component";
import { ChartOptions } from "chart-adapter";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { chartTypeSelector, queryChartOptionsSelector } from "./store/chart.selectors";
import { State } from "./store/chart.reducer";
import {ChartActions} from "./store/chart.actions";
import * as _ from 'lodash';

@Component({
  selector: 'app-chart-builder',
  templateUrl: './chart-builder.component.html',
  styleUrls: ['./chart-builder.component.css']
})
export class ChartBuilderComponent implements OnInit {
  private chartGroups: any = chartGroups;

  options: ChartOptions = new ChartOptions();

  theme = 'dark';
  chart: BaseChartComponent & ChartOptions;
  $chartType: Observable<string>;
  $queryStuff: Observable<string>;

  results: any;

  linearScale: boolean = false;
  range: boolean = false;

  view: [number, number] = [700, 300];

  constructor(private store: Store<State>) {
    this.$chartType = this.store.select(chartTypeSelector);
    this.$chartType.subscribe(chartType => this.selectChartObservable(chartType));
    this.$queryStuff = this.store.select(queryChartOptionsSelector);
    console.log(this.$queryStuff);
    this.$queryStuff.subscribe(x => console.log(x, 'fuck'));

    this.store.dispatch(new ChartActions.SetChartTypeAction('bar-vertical'));
    this.store.dispatch(new ChartActions.SetChartGroupsAction(_.cloneDeep(this.chartGroups)));
  }

  ngOnInit(): void {
    this.setColorScheme('cool');
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
    this.results = result();
  }
}

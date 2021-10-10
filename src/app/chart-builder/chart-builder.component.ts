import { Component, OnInit } from '@angular/core';
import chartGroups from './models/chartTypes';
import { BaseChartComponent } from "@swimlane/ngx-charts/lib/common/base-chart.component";
import { ChartOptions } from "./models/chart-options";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { chartTypeSelector } from "./store/scoreboard.selectors";
import { State } from "./store/scoreboard.reducer";
import {ChartActions} from "./store/scoreboard-page.actions";

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
  $chartType: Observable<string>;
  chartGroups: any = chartGroups;

  results: any;

  linearScale: boolean = false;
  range: boolean = false;

  view: [number, number] = [700, 300];

  constructor(private store: Store<State>) {
    this.$chartType = this.store.select(chartTypeSelector);

    this.store.dispatch(new ChartActions.SetChartTypeAction('bar-vertical'));
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
    console.log('select chart', chartSelector);
    this.chartType = chartSelector = chartSelector.replace('/', '');

    for (const group of this.chartGroups) {
      this.chart = group.charts.find(x => x.selector === chartSelector);
      if (this.chart) break;
    }

    this.linearScale = false;
  }

  selectResults(result) {
    this.results = result();
  }

  updateChartTypes(selectedInputFormat: string) {
    this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .forEach(chart => chart.visible = selectedInputFormat === chart.inputFormat)
  }
}

import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { State } from "../../store/chart.reducer";
import { Observable } from "rxjs";
import { chartTypeSelector, inputFormatSelector } from "../../store/chart.selectors";

import chartGroups from '../../models/chartTypes';
import { ChartActions } from "../../store/chart.actions";


@Component({
  selector: 'app-chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css']
})
export class ChartTypeSelectorComponent {

  $chartType: Observable<string>;
  private $inputFormat: Observable<string>;

  chartGroups: any = chartGroups;

  constructor(private store: Store<State>) {
    this.$chartType = store.select(chartTypeSelector);
    this.$inputFormat = store.select(inputFormatSelector);

    this.$inputFormat.subscribe(inputFormat => this.updateChartTypes(inputFormat));
  }

  selectChart(chartSelector: string) {
    this.store.dispatch(new ChartActions.SetChartTypeAction(chartSelector));
  }

  updateChartTypes(inputFormat: string) {
    this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .forEach(chart => chart.visible = inputFormat === chart.inputFormat)
  }
}

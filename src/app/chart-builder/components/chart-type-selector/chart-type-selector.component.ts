import {Component} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../store/scoreboard.reducer";
import {Observable} from "rxjs";
import {chartTypeSelector, inputFormatSelector} from "../../store/scoreboard.selectors";

import chartGroups from '../../models/chartTypes';
import {ChartActions} from "../../store/scoreboard-page.actions";
import SetChartTypeAction = ChartActions.SetChartTypeAction;


@Component({
  selector: 'app-chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css']
})
export class ChartTypeSelectorComponent {

  $chartType: Observable<string>;
  private $inputFormat: Observable<string>;

  @Output() selectEvent = new EventEmitter<string>();

  chartGroups: any = chartGroups;

  constructor(private store: Store<State>) {
    this.$chartType = store.select(chartTypeSelector);
    this.$inputFormat = store.select(inputFormatSelector);

    this.$inputFormat.subscribe(inputFormat => this.updateChartTypes(inputFormat));
    this.$chartType.forEach(asd => console.log('UFFAAACK', asd, this.chartGroups));
  }

  selectChart(chartSelector: string) {
    this.store.dispatch(new SetChartTypeAction(chartSelector));
    //this.selectEvent.emit(chartSelector);
    console.log(chartSelector);
  }


  updateChartTypes(inputFormat: string) {
    this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .forEach(chart => chart.visible = inputFormat === chart.inputFormat)
  }
}

import {Component} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../store/scoreboard.reducer";
import {Observable} from "rxjs";
import {chartTypeSelector} from "../../store/scoreboard.selectors";

import chartGroups from '../../models/chartTypes';


@Component({
  selector: 'app-chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css']
})
export class ChartTypeSelectorComponent {

  $chartType: Observable<string>;

  @Output() selectEvent = new EventEmitter<string>();

  chartGroups: any = chartGroups;

  constructor(private store: Store<State>) {
    this.$chartType = store.select(chartTypeSelector);
  }

  selectChart(chartSelector: string) {
    this.selectEvent.emit(chartSelector)
    console.log(chartSelector);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../store/scoreboard.reducer";
import {Observable} from "rxjs";
import {chartTypeSelector} from "../../store/scoreboard.selectors";

import chartGroups from '../../models/chartTypes';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-data-type-selector',
  templateUrl: './data-type-selector.component.html',
  styleUrls: ['./data-type-selector.component.css']
})
export class DataTypeSelectorComponent {

  @Output() selectEvent = new EventEmitter<string>();

  chartGroups: any = chartGroups;
  inputFormats: [];
  $inputFormat: Observable<string>;

  constructor(private store: Store<State>) {
    // Fetch enabled inputFormats from chartGroups
    this.inputFormats = this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .map(chart => chart.inputFormat)
      .filter((value, index, self) => self.indexOf(value) === index);

    this.$inputFormat = store.pipe(select(chartTypeSelector),
      map(chartType => this.chartGroups.filter(group => !group.disabled)
        .flatMap(group => group.charts)
        .filter(chart => chart.selector === chartType)[0].inputFormat));

    this.$inputFormat.subscribe(inputFormat => console.log('input format changed:', inputFormat));
    this.$inputFormat.subscribe(inputFormat => this.selectEvent.emit(inputFormat));
  }

  selectDataType(selectedInputFormat: string) {
    console.log('dataTypeSelectorComponent', selectedInputFormat);
    this.selectEvent.emit(selectedInputFormat);
  }
}

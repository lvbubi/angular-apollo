import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { State } from "../../store/chart.reducer";
import { Observable } from "rxjs";
import { chartTypeSelector, inputFormatSelector } from "../../store/chart.selectors";

import chartGroups from '../../chartTypes';
import { ChartActions } from "../../store/chart.actions";
import SetInputFormatAction = ChartActions.SetInputFormatAction;

@Component({
  selector: 'app-data-type-selector',
  templateUrl: './data-type-selector.component.html',
  styleUrls: ['./data-type-selector.component.css']
})
export class DataTypeSelectorComponent {

  chartGroups: any = chartGroups;
  inputFormats: [];

  $inputFormat: Observable<string>;
  private $chartType: Observable<string>;

  constructor(private store: Store<State>) {
    this.$inputFormat = store.select(inputFormatSelector);
    this.$chartType = store.select(chartTypeSelector);
    // Fetch enabled inputFormats from chartGroups
    this.inputFormats = this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .map(chart => chart.inputFormat)
      .filter((value, index, self) => self.indexOf(value) === index);

    this.$chartType.subscribe(chartType => {
      let initialInputFormat = this.chartGroups.filter(group => !group.disabled)
        .flatMap(group => group.charts)
        .filter(chart => chart.selector === chartType)[0].inputFormat;

      this.store.dispatch(new SetInputFormatAction(initialInputFormat));
    });

    this.$inputFormat.subscribe(inputFormat => console.log('input format changed:', inputFormat));
    this.$inputFormat.subscribe(inputFormat => this.store.dispatch(new SetInputFormatAction(inputFormat)));
  }

  selectDataType(selectedInputFormat: string) {
    console.log('dataTypeSelectorComponent', selectedInputFormat);
    this.store.dispatch(new SetInputFormatAction(selectedInputFormat));
  }
}

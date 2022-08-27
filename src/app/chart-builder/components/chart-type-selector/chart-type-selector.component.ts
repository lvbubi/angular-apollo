import { Component, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { State } from "../../store/chart.reducer";
import { Observable } from "rxjs";
import { inputFormatSelector } from "../../store/chart.selectors";

import chartGroups from '../../chartTypes';
import { Configuration } from "chart-adapter";


@Component({
  selector: 'chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css']
})
export class ChartTypeSelectorComponent {

  @Input()
  configuration: Configuration;

  private $inputFormat: Observable<string>;

  chartGroups: any = chartGroups;

  constructor(private store: Store<State>) {
    this.$inputFormat = store.select(inputFormatSelector);

    this.$inputFormat.subscribe(inputFormat => this.updateChartTypes(inputFormat));
  }

  updateChartTypes(inputFormat: string) {
    this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .forEach(chart => {
        chart.visible = inputFormat === chart.inputFormat;
      })
  }
}

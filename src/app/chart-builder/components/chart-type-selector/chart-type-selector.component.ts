import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import chartGroups from '../../chartTypes';
import { InputFormat } from "chart-adapter";


@Component({
  selector: 'chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css']
})
export class ChartTypeSelectorComponent implements OnChanges {

  @Input()
  chartType: string;

  @Input()
  inputFormat: InputFormat;

  @Output()
  selectChartTypeEvent = new EventEmitter<string>();

  chartGroups: any = chartGroups;

  constructor() {
    this.updateChartTypes(this.inputFormat);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    if (changes?.inputFormat?.currentValue) {
      this.updateChartTypes(changes.inputFormat.currentValue);
    }
  }

  chartTypeChange(changes: string): void {
    console.log('chartTypeChange', changes);
    this.selectChartTypeEvent.emit(changes);
  }

  updateChartTypes(inputFormat: InputFormat) {
    this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .forEach(chart => {
        chart.visible = inputFormat == chart.inputFormat;
      })
  }
}

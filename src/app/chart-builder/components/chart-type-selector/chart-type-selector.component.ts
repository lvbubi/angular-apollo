import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import chartGroups from '../../chartTypes';
import { Configuration } from "chart-adapter";


@Component({
  selector: 'chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css']
})
export class ChartTypeSelectorComponent implements OnChanges {

  @Input()
  configuration: Configuration;

  @Input()
  inputFormat: string;

  chartGroups: any = chartGroups;

  constructor() {
    this.updateChartTypes(this.inputFormat);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChartTypes(changes.inputFormat.currentValue);
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

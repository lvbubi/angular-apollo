import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import chartGroups from '../../chartTypes';
import { InputFormat, DataSourceMapper } from "chart-adapter";


@Component({
  selector: 'chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css']
})
export class ChartTypeSelectorComponent implements OnChanges {

  @Input()
  chartType: string;

  @Input()
  data: any;

  @Output()
  selectChartTypeEvent = new EventEmitter<string>();

  chartGroups: any = chartGroups;

  constructor(private chartAdapterService: DataSourceMapper) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    this.updateChartTypes();
  }

  chartTypeChange(changes: string): void {
    console.log('chartTypeChange', changes);
    this.selectChartTypeEvent.emit(changes);
  }

  updateChartTypes() {
    let inputFormat: InputFormat;
    console.log('ChartTypeSelectorComponent', 'data', this.data);
    if (this.chartAdapterService.isSingleSeries(this.data)) {
      inputFormat = InputFormat.singleSeries;
    } else if (this.chartAdapterService.isMultiSeries(this.data)) {
      inputFormat = InputFormat.multiSeries;
    } else {
      throw "Invalid dataSource format";
    }

    this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .forEach(chart => {
        chart.visible = inputFormat == chart.inputFormat;
      })
  }
}

import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import chartGroups from '../../chartTypes';
import { InputFormat } from "chart-adapter";
import {ChartAdapterService} from "../../../../../projects/chart-adapter/src/lib/chart-adapter.service";


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

  constructor(private chartAdapterService: ChartAdapterService) {
    this.updateChartTypes();
  }

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
    if (this.chartAdapterService.isSingleSeries(this.data)) {
      inputFormat = InputFormat.singleSeries;
    } else if (this.chartAdapterService.isMultiSeries(this.data)) {
      inputFormat = InputFormat.multiSeries;
    } else {
      throw "Invalid dataSource format";
    }

    console.log("updateChartTypes", "inputFormat", inputFormat, "data", this.data);
    this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .forEach(chart => {
        chart.visible = inputFormat == chart.inputFormat;
      })
  }
}

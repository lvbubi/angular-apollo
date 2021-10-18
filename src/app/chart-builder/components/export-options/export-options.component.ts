import { Component, Inject, Input, OnInit } from '@angular/core';
import { ChartOptions } from "../../models/chart-options";
import { Store } from "@ngrx/store";
import { State } from "../../store/chart.reducer";
import { Observable } from "rxjs";
import { chartTypeSelector } from "../../store/chart.selectors";

import chartGroups from '../../models/chartTypes';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";

export interface DialogData {
  name: string,
  value: any
}

@Component({
  selector: 'app-export-options',
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.css']
})
export class ExportOptionsComponent implements OnInit {

  @Input() options: ChartOptions;

  $chartType: Observable<string>;
  chartType: string;
  chartGroups: any = chartGroups;

  exportedOptions: [][];

  constructor(private store: Store<State>, public dialog: MatDialog) {
    this.$chartType = store.select(chartTypeSelector);
    this.$chartType.subscribe(chartType => this.chartType = chartType);
  }

  ngOnInit(): void {
  }

  exportOptions() {
    this.exportedOptions = this.chartGroups.filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .filter(chart => chart.selector === this.chartType)
      .flatMap(chart => chart.options)
      .map(option => {
        return {
          name: option,
          value: this.options[option]
        };
      });

    this.dialog.open(ExportOptionsDialog, {
        data: this.exportedOptions
      }
    );
  }
}

@Component({
  selector: 'export-options-dialog',
  templateUrl: './export-options-dialog.html',
})
export class ExportOptionsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData[]) {
    console.log(this.data);
  }
}

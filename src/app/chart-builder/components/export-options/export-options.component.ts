import { Component, Inject, Input, OnInit } from '@angular/core';
import { ChartOptions } from "chart-adapter";
import { Store } from "@ngrx/store";
import { State } from "../../store/chart.reducer";
import { Observable } from "rxjs";
import { chartTypeSelector } from "../../store/chart.selectors";

import chartGroups from "../../chartTypes";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ChartRegisterService } from "../../service/chart-register.service";

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

  constructor(private store: Store<State>, private chartRegisterService: ChartRegisterService, public dialog: MatDialog) {
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
          value: JSON.stringify(this.options[option])
        };
      });

    this.chartRegisterService.addNewConfiguration(this.chartType, JSON.stringify(this.exportedOptions));



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

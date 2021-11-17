import { Component, Inject, Input, OnInit } from '@angular/core';
import { ChartOptions } from "chart-adapter";
import { Store } from "@ngrx/store";
import { Configuration, State } from "../../store/chart.reducer";
import { configurationSelector } from "../../store/chart.selectors";

import chartGroups from "../../chartTypes";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ChartRegisterService } from "../../service/chart-register.service";
import { DomSanitizer } from "@angular/platform-browser";
import {ConfigurationParserService} from "./service/configuration-parser.service";

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

  sanitizedBlobUrl: any;

  configuration: Configuration;

  chartGroups: any = chartGroups;

  constructor(private store: Store<State>,
              private chartRegisterService: ChartRegisterService,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private parser: ConfigurationParserService) {
    store.select(configurationSelector).subscribe(configuration => this.configuration = configuration);
  }

  ngOnInit(): void {}

  async exportOptions() {
    let chartOptions = this.mapOptionsToJson();
    let chartOptionsString = JSON.stringify(chartOptions, null, 2);

    this.chartRegisterService.addNewConfiguration(this.configuration.chartType, chartOptionsString);

    const typeScriptFile = this.parser.createJsonFile(this.configuration, chartGroups);
    //let blob = new Blob([chartOptionsString], { type: 'application/json' });
    let blob = new Blob([JSON.stringify(typeScriptFile, null, 2)], { type: 'text/prs.typescript' });
    this.sanitizedBlobUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
  }

  async viewOptions() {
    let chartOptions = this.mapOptionsToJson();
    this.dialog.open(ExportOptionsDialog, {
        data: chartOptions
      }
    );
  }

  private mapOptionsToJson() {
    return this.chartGroups.filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .filter(chart => chart.selector === this.configuration.chartType)
      .flatMap(chart => chart.options)
      .map(option => {
        return {
          name: option,
          value: JSON.stringify(this.options[option])
        };
      });
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

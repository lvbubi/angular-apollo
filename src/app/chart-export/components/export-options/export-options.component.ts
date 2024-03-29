import { Component, Inject, Input, OnInit } from '@angular/core';
import { Configuration } from "chart-adapter";

import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ChartRegisterService } from "../../service/chart-register.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ConfigurationParserService } from "../../service/configuration-parser.service";

@Component({
  selector: 'app-export-options',
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.css']
})
export class ExportOptionsComponent implements OnInit {

  @Input() configuration: Configuration;

  sanitizedBlobUrl: any;

  constructor(private chartRegisterService: ChartRegisterService,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private parser: ConfigurationParserService) {
  }

  ngOnInit(): void {}

  async exportToTypeScript() {
    let chartOptionsString = this.parser.createTypescriptFile(this.configuration);

    this.chartRegisterService.addNewConfiguration(
      this.configuration.chartType, chartOptionsString);

    let blob = new Blob([chartOptionsString],
      { type: 'text/prs.typescript' });
    this.sanitizedBlobUrl = this.sanitizer
      .bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
  }

  viewOptions() {
    let chartOptions = this.parser.createTypescriptFile(this.configuration);
    this.dialog.open(ExportOptionsDialog, {
        data: chartOptions
      }
    );
  }

  exportToDatabase() {
    let chartOptionsString = this.parser.createTypescriptFile(this.configuration);
    this.chartRegisterService.addNewConfiguration(this.configuration.chartType, chartOptionsString);
  }
}

@Component({
  selector: 'export-options-dialog',
  templateUrl: './export-options-dialog.html',
})
export class ExportOptionsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Object) {}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartOptionsComponent} from "../chart-builder/components/chart-options/chart-options.component";
import {ExportOptionsComponent, ExportOptionsDialog} from "./components/export-options/export-options.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ChartOptionsComponent,
    ExportOptionsComponent,
    ExportOptionsDialog
  ],
  exports: [
    ExportOptionsComponent,
    ChartOptionsComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
  ]
})
export class ChartExportModule { }

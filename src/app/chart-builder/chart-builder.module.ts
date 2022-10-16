import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { InputFormatComponent } from "./components/input-format-selector/input-format.component";
import { ChartTypeSelectorComponent } from "./components/chart-type-selector/chart-type-selector.component";
import { ChartBuilderComponent } from "./chart-builder.component";
import { RouterModule } from "@angular/router";
import { ChartOptionsComponent } from "./components/chart-options/chart-options.component";
import { StoreModule } from "@ngrx/store";
import * as fromScoreboard from './store/chart.reducer';
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { ExportOptionsComponent, ExportOptionsDialog } from '../chart-export/components/export-options/export-options.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ChartAdapterModule } from "chart-adapter";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {DataIntegrationModule} from "../data-integration/data-integration.module";

@NgModule({
  declarations: [
    ChartTypeSelectorComponent,
    InputFormatComponent,
    ChartBuilderComponent,
    ChartOptionsComponent,
    ExportOptionsComponent,
    ExportOptionsDialog
  ],
  exports: [
  ],
  imports: [
    RouterModule.forRoot([
      {path: 'builder', component: ChartBuilderComponent}
    ]),
    StoreModule.forFeature(fromScoreboard.scoreboardFeatureKey, fromScoreboard.reducer),
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    TextFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    ChartAdapterModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    DataIntegrationModule
  ]
})
export class ChartBuilderModule {
}

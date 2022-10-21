import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { ChartTypeSelectorComponent } from "./components/chart-type-selector/chart-type-selector.component";
import { ChartBuilderComponent } from "./chart-builder.component";
import { RouterModule } from "@angular/router";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from "@angular/material/dialog";
import { ChartAdapterModule } from "chart-adapter";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {DataIntegrationModule} from "../data-integration/data-integration.module";
import {ChartExportModule} from "../chart-export/chart-export.module";

@NgModule({
  declarations: [
    ChartTypeSelectorComponent,
    ChartBuilderComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {path: 'builder', component: ChartBuilderComponent}
    ]),
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
    DataIntegrationModule,
    ChartExportModule
  ]
})
export class ChartBuilderModule {
}

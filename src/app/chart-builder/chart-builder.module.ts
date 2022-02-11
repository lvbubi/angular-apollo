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
import { DataSourceSelectorComponent } from "./components/data-source-selector/data-source-selector.component";
import { StoreModule } from "@ngrx/store";
import * as fromScoreboard from './store/chart.reducer';
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { ExportOptionsComponent, ExportOptionsDialog } from './components/export-options/export-options.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ChartAdapterModule } from "chart-adapter";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { JsonInputComponent } from './components/data-source-selector/json-input/json-input.component';
import { CustomDataSourceComponent } from './components/data-source-selector/custom-data-source/custom-data-source.component';
import { GraphqlDataSourceComponent } from './components/data-source-selector/graphql-data-source/graphql-data-source.component';
import { AutosizeInputComponent } from './components/data-source-selector/autosize-input/autosize-input.component';

@NgModule({
  declarations: [
    ChartTypeSelectorComponent,
    InputFormatComponent,
    ChartBuilderComponent,
    ChartOptionsComponent,
    DataSourceSelectorComponent,
    ExportOptionsComponent,
    ExportOptionsDialog,
    JsonInputComponent,
    CustomDataSourceComponent,
    GraphqlDataSourceComponent,
    AutosizeInputComponent
  ],
    imports: [
        RouterModule.forRoot([
            { path: 'builder', component: ChartBuilderComponent }
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
        ReactiveFormsModule
    ]
})
export class ChartBuilderModule {
}

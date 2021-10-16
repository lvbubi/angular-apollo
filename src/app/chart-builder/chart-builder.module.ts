import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { DataTypeSelectorComponent } from "./components/data-type-selector/data-type-selector.component";
import { ChartTypeSelectorComponent } from "./components/chart-type-selector/chart-type-selector.component";
import { ChartBuilderComponent } from "./chart-builder.component";
import { RouterModule } from "@angular/router";
import { ChartOptionsComponent } from "./components/chart-options/chart-options.component";
import { ChartAdapterComponent } from './components/chart-adapter/chart-adapter.component';
import { DataSourceSelectorComponent } from "./components/data-source-selector/data-source-selector.component";
import {StoreModule} from "@ngrx/store";
import * as fromScoreboard from './store/chart.reducer';

@NgModule({
  declarations: [
    ChartTypeSelectorComponent,
    DataTypeSelectorComponent,
    ChartBuilderComponent,
    ChartOptionsComponent,
    ChartAdapterComponent,
    DataSourceSelectorComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'builder', component: ChartBuilderComponent }
    ]),
    StoreModule.forFeature(fromScoreboard.scoreboardFeatureKey, fromScoreboard.reducer),
    CommonModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
  ]
})
export class ChartBuilderModule { }

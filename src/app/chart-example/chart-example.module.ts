import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SimpleChartComponent } from './simple-chart/simple-chart.component';
import { ChartAdapterModule } from "chart-adapter";


@NgModule({
  declarations: [
    SimpleChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'example', component: SimpleChartComponent}
    ]),
    ChartAdapterModule
  ]
})
export class ChartExampleModule { }

import { NgModule } from '@angular/core';
import { ChartAdapterComponent } from './chart-adapter.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    ChartAdapterComponent
  ],
  imports: [
    NgxChartsModule
  ],
  exports: [
    ChartAdapterComponent
  ]
})
export class ChartAdapterModule {}

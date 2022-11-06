import { multi } from './data'
import { Component } from '@angular/core';
import { Configuration } from "chart-adapter";
import { configuration } from "./chart-configuration";

@Component({
  selector: 'app-simple-chart',
  template: `<chart-adapter-component [dataSource]="data"
    [configuration]="configuration">
  </chart-adapter-component>`
})
export class SimpleChartComponent {
  configuration: Configuration = configuration;
  data: any = multi;
  constructor() { }
}

import { Component } from '@angular/core';

import { Configuration } from "chart-adapter";

import { configuration } from "./chart-configuration";
import { data } from "./data";

@Component({
  selector: 'app-simple-chart',
  template: `<chart-adapter-component [data]="data"
    [configuration]="configuration">
  </chart-adapter-component>`
})
export class SimpleChartComponent {

  configuration: Configuration = configuration;
  data: any = data;
  constructor() { }
}

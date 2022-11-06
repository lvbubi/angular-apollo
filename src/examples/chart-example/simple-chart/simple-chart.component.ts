import { Component } from '@angular/core';

import { Configuration } from "chart-adapter";

import { configuration } from "./chart-configuration";
import { single } from '../../../app/chart-builder/data';

@Component({
  selector: 'app-simple-chart',
  template: `<chart-adapter-component [dataSource]="data"
    [configuration]="configuration">
  </chart-adapter-component>`
})
export class SimpleChartComponent {
  configuration: Configuration = configuration;
  data: any = single;
  constructor() { }
}

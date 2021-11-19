import { Component, OnInit } from '@angular/core';

import { Configuration } from "chart-adapter";

import { configuration } from "./chart-configuration";
import { data } from "./data";

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.css']
})
export class SimpleChartComponent implements OnInit {

  configuration: Configuration = configuration;
  data: any = data;
  constructor() { }

  ngOnInit(): void {
  }

}

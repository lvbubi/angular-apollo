import { Component, OnInit } from '@angular/core';

import { ChartOptions } from "chart-adapter";

import { configuration, mapper } from "./chart-configuration";
import { data } from "./data";

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.css']
})
export class SimpleChartComponent implements OnInit {

  options: ChartOptions;
  mapper: any;
  data: any = data;
  constructor() { }

  ngOnInit(): void {
    console.log(this.options = ChartOptions.fromJSON(configuration));
    this.mapper = mapper;
    console.log(this.mapper);
    //console.log(JSON.parse(configuration.toString()));
    //console.log(JSON.parse(configuration.toString()));
  }

}

import { Component, OnInit } from '@angular/core';

import { ChartOptions } from "chart-adapter";

import { configuration } from "./chart-configuration";

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.css']
})
export class SimpleChartComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    console.log(ChartOptions.fromJSON(configuration));
    //console.log(JSON.parse(configuration.toString()));
    //console.log(JSON.parse(configuration.toString()));
  }

}

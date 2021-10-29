import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

import * as objectMapper from 'object-mapper'

import {
  SingleSeries,
  MultiSeries,
  BubbleChartMultiSeries,
  BoxChartMultiSeries,
  Series,
  TreeMapData
} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-data-source-mapper',
  templateUrl: './data-source-mapper.component.html',
  styleUrls: ['./data-source-mapper.component.css']
})
export class DataSourceMapperComponent implements OnInit {

  @Input() resultEvent: EventEmitter<any>;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  textArea: string;

  mapper: string

  constructor() { }

  ngOnInit(): void {
  }

  /**
   [{
   "name": "Germany",
   "value": 40632,
   "extra": {
      "code": "de"
    }
   }]
   */
  setDataSource() {
    try {
      let resultObject: SingleSeries | MultiSeries | BubbleChartMultiSeries | BoxChartMultiSeries | Series | TreeMapData = JSON.parse(this.textArea);
      this.resultEvent.emit(() => resultObject);
    } catch (e) {
      console.log('failed to map', e);
    }
  }

  /*
   {"[].value": "asd[]"}
   {"value": "asd"}
   */
  mapDataSource() {
    //src, dest, map
    let result = {asd: 'lol'};
    console.log(JSON.parse(this.textArea), result, JSON.parse(this.mapper));
    let mappedObject = objectMapper(JSON.parse(this.textArea), JSON.parse(this.mapper));
    console.log(mappedObject, "mapped object");
  }
}

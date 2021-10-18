import {Component, EventEmitter, NgZone, Output, ViewChild} from '@angular/core';
import { DataService } from "../../data-service/data-service.component";
import { single, multi, boxData, bubble, treemap, generateData } from '../../models/data';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-data-source-selector',
  templateUrl: './data-source-selector.component.html',
  styleUrls: ['./data-source-selector.component.css']
})
export class DataSourceSelectorComponent {

  private dataMap: Map<string, any> = new Map<string, any>();
  resultKeys: string[];
  resultKey: string = "single";
  textArea: string;

  @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('autosize') autosize: CdkTextareaAutosize;


  constructor(private dataService: DataService, private _ngZone: NgZone) {

    this.dataMap.set("custom", () => this.textArea);
    this.dataMap.set("single", () => single);
    this.dataMap.set("multi", () => multi);
    this.dataMap.set("bubble", () => bubble);
    this.dataMap.set("boxData", () => boxData);
    this.dataMap.set("treemap", () => treemap);
    this.dataMap.set("dateData", () => generateData(5, false));
    this.dataMap.set("dateDataWithRange", () => generateData(2, true));
    this.dataMap.set("calendarData", () => this.dataService.getCalendarData());
    this.dataMap.set("statusData", () => this.dataService.getStatusData());

    this.resultKeys = Array.from(this.dataMap.keys());
  }

  selectDataSource(resultKey: string) {
    console.log('resultKey: ', resultKey);
    if (resultKey === 'custom') {
      return;
    }
    this.resultEvent.emit(this.dataMap.get(resultKey));
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
    console.log(this.textArea);
    this.resultEvent.emit(() => JSON.parse(this.textArea));
  }
}

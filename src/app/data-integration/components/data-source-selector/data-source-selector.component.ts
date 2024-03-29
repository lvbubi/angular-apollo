import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { DataService } from "../../service/data-service.component";
import { single, multi, boxData, bubble, treemap, generateData } from '../../../chart-builder/data';

@Component({
  selector: 'app-data-source-selector',
  templateUrl: './data-source-selector.component.html',
  styleUrls: ['./data-source-selector.component.css']
})
export class DataSourceSelectorComponent {

  private dataMap: Map<string, any> = new Map<string, any>();
  dataSourceType: string;
  dataSourceTypes: string[];

  @Output() dataSource: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dataService: DataService, private _ngZone: NgZone) {
    this.dataMap.set("graphql", null);
    this.dataMap.set("kong", null);
    this.dataMap.set("node-red", null);
    this.dataMap.set("custom", null);
    this.dataMap.set("single", () => single);
    this.dataMap.set("multi", () => multi);
    this.dataMap.set("bubble", () => bubble);
    this.dataMap.set("boxData", () => boxData);
    this.dataMap.set("treemap", () => treemap);
    this.dataMap.set("dateData", () => generateData(5, false));
    this.dataMap.set("dateDataWithRange", () => generateData(2, true));
    // this.dataMap.set("calendarData", () => this.dataService.getCalendarData());
    this.dataMap.set("statusData", () => this.dataService.getStatusData());

    this.dataSourceTypes = Array.from(this.dataMap.keys());
  }

  selectDataSource(resultKey: string) {
    if (resultKey === 'custom' || resultKey === 'graphql') {
      return;
    }
    this.dataSource.emit(this.dataMap.get(resultKey));
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DataService } from "../../data-service/data-service.component";
import { single, multi, boxData, bubble, treemap, generateData } from '../../models/data';
@Component({
  selector: 'app-data-source-selector',
  templateUrl: './data-source-selector.component.html',
  styleUrls: ['./data-source-selector.component.css']
})
export class DataSourceSelectorComponent implements OnInit {

  private dataMap: Map<string, any> = new Map<string, any>();
  resultKeys: string[];
  resultKey: string = "single";

  @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dataService: DataService) {
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

  ngOnInit(): void {
    /** TODO: Fix this bug... Ngrx store would be nice
     *
     */
    //this.resultEvent.emit(() => single);
  }

  select(resultKey: string) {
    this.resultEvent.emit(this.dataMap.get(resultKey));
  }
}

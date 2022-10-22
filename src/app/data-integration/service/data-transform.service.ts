import {EventEmitter, Injectable} from '@angular/core';
import * as objectMapper from 'object-mapper'
import {ChartAdapterService} from "../../../../projects/chart-adapter/src/lib/chart-adapter.service";
import {MultiSeries, SingleSeries} from "@swimlane/ngx-charts";

@Injectable({
  providedIn: 'root'
})
export class DataTransformService {

  constructor(private chartAdapterService: ChartAdapterService) { }

  transform(data:any, mapper, outputEvent: EventEmitter<any>) {
    let mappedObject: SingleSeries | MultiSeries;

    if (!mapper) {
      mappedObject = data;
    } else {
      const dataMapper = JSON.parse(mapper);
      mappedObject = objectMapper(data, dataMapper);
      if (mappedObject === undefined) {
        throw "Mapped result is empty";
      }
    }

    if (this.chartAdapterService.isSingleSeries(mappedObject) || this.chartAdapterService.isMultiSeries(mappedObject)) {
      outputEvent.emit(() => mappedObject);
    } else {
      throw "Invalid dataSource format";
    }
  }
}

import { Injectable } from '@angular/core';
import {DataItem, Series} from "@swimlane/ngx-charts/lib/models/chart-data.model";
import {MultiSeries, SingleSeries} from "@swimlane/ngx-charts";
import {isIterable} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class ChartAdapterService {

  constructor() { }

  isSingleSeries(dataSource: SingleSeries | MultiSeries): dataSource is SingleSeries {
    if (!isIterable(dataSource)) {
      throw "dataSource is not iterable";
    }

    return this.isSingleSeriesElement(dataSource[0]);
  }

  isMultiSeries(dataSource: SingleSeries | MultiSeries): dataSource is MultiSeries {
    if (!isIterable(dataSource)) {
      throw "dataSource is not iterable";
    }

    return this.isMultiSeriesElement(dataSource[0]);
  }

  private isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }


  private isSingleSeriesElement(element: DataItem | Series): element is DataItem {
    return (element as DataItem).value !== undefined;
  }

  private isMultiSeriesElement(element: DataItem | Series): element is Series {
    return (element as Series).series !== undefined;
  }
}

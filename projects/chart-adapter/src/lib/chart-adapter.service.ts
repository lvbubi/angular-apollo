import { Injectable } from '@angular/core';
import {DataItem, Series} from "@swimlane/ngx-charts/lib/models/chart-data.model";
import {MultiSeries, SingleSeries} from "@swimlane/ngx-charts";

@Injectable({
  providedIn: 'root'
})
export class ChartAdapterService {

  constructor() { }

  isSingleSeries(dataSource: SingleSeries | MultiSeries): dataSource is SingleSeries {
    if (!dataSource || !dataSource[0]) {
      return true;
    }

    return this.isSingleSeriesElement(dataSource[0]);
  }

  isMultiSeries(dataSource: SingleSeries | MultiSeries): dataSource is MultiSeries {
    if (!dataSource || !dataSource[0]) {
      return true;
    }

    return this.isMultiSeriesElement(dataSource[0]);
  }


  private isSingleSeriesElement(element: DataItem | Series): element is DataItem {
    return (element as DataItem).value !== undefined;
  }

  private isMultiSeriesElement(element: DataItem | Series): element is Series {
    return (element as Series).series !== undefined;
  }
}

import { Injectable } from '@angular/core';
import {DataItem, Series} from "@swimlane/ngx-charts/lib/models/chart-data.model";
import {MultiSeries, SingleSeries} from "@swimlane/ngx-charts";
import {isIterable} from "rxjs/internal-compatibility";

import * as objectMapper from 'object-mapper'

@Injectable({
  providedIn: 'root'
})
export class DataSourceMapper {

  constructor() { }

  map(dataSource: any, mapper: any): SingleSeries | MultiSeries {
    let newData;
    console.log('dataSource', dataSource, 'mapper', mapper);
    if (mapper) {
      let parsedMapper = mapper;
      newData = objectMapper(dataSource, parsedMapper);
    } else {
      newData = dataSource;
    }

    if (this.isValidDataSource(newData)) {
      return newData;
    }

    throw "Invalid dataSource format";
  }

  isValidDataSource(dataSource: any) {
    return this.isSingleSeries(dataSource) || this.isMultiSeries(dataSource);
  }

  isSingleSeries(dataSource: SingleSeries | MultiSeries): dataSource is SingleSeries {
    if (!isIterable(dataSource)) {
      console.log('not iterable', dataSource);
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

  private isSingleSeriesElement(element: DataItem | Series): element is DataItem {
    return (element as DataItem).value !== undefined;
  }

  private isMultiSeriesElement(element: DataItem | Series): element is Series {
    return (element as Series).series !== undefined;
  }
}

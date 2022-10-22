import {EventEmitter, Injectable} from '@angular/core';
import {DataSourceMapper} from "chart-adapter";

@Injectable({
  providedIn: 'root'
})
export class DataTransformService {

  constructor(private dataSourceMapper: DataSourceMapper) { }

  transform(dataSource:any, mapper, outputEvent: EventEmitter<any>) {
    let mappedObject = this.dataSourceMapper.map(dataSource, mapper)

    if (mappedObject) {
      outputEvent.emit(() => mappedObject);
    } else {
      throw "Invalid dataSource format";
    }
  }
}

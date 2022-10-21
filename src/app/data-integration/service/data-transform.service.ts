import {EventEmitter, Injectable} from '@angular/core';
import * as objectMapper from 'object-mapper'

@Injectable({
  providedIn: 'root'
})
export class DataTransformService {

  constructor() { }

  transform(data:any, mapper, outputEvent: EventEmitter<any>) {
    console.log('Data:', data);
    const dataMapper = JSON.parse(mapper);
    let mappedObject = objectMapper(data, dataMapper);
    if (mappedObject == undefined) {
      throw "Mapped result is empty";
    }
    try {
      outputEvent.emit(() => mappedObject);
    } catch (e) {
      throw "Query result can not be mapped";
    }
  }
}

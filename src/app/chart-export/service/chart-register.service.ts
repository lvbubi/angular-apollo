import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChartRegisterService {

  constructor(private httpClient: HttpClient) {}

  addNewConfiguration(type: string, options: string): void {
    console.log('chartRegister onInit', this.httpClient);
    this.httpClient.put<any>('/backend', {
      type: type,
      options: options
    }, {
      headers: new HttpHeaders({
        'ContentType': 'application/json'
      })
    }).subscribe(result => {
      console.log('result:', result);
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const KONG_ROOT = '/kong'; // <-- add the URL of the GraphQL server here

@Injectable({
  providedIn: 'root',
})
export class GenericRestApiService {

  constructor(private http: HttpClient) {
  }

  genericRestApiCall(api: string, method: string): Promise<any> {
    console.log('genericRestApiCall:', api, method);

    if (method == 'GET') {
      return this.http
        .get<any>(KONG_ROOT + api)
        .toPromise();
    }

    throw "Unsupported Method Type";
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class GenericRestApiService {

  constructor(private http: HttpClient) {}

  genericRestApiCall(baseUrl: string, api: string, method: string): Promise<any> {
    console.log('genericRestApiCall:', api, method);

    if (method == 'GET') {
      return this.http
        .get<any>(baseUrl + api)
        .toPromise();
    }

    throw "Unsupported Method Type";
  }
}

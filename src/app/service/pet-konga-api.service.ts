import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {retry, catchError, map} from 'rxjs/operators';
import {PetModel} from "../pet-example/model/pet-model";
import {PetApi} from "./pet-api";

@Injectable({
  providedIn: 'root',
})
export class PetKongaApiService implements PetApi {
  apiURL = '/konga/pet';
  constructor(private http: HttpClient) {}

  getAvailablePets(): Promise<PetModel[]> {
    return this.http
      .get<PetModel[]>(this.apiURL + '/findByStatus?status=available')
      .pipe(map(this.distinctPets), map(pets => pets.slice(0, 10)), retry(1), catchError(this.handleError)).toPromise();
  }

  getPetById(id: number): Promise<PetModel> {
    return this.http
      .get<PetModel>(this.apiURL + `/${id}`)
      .pipe(retry(1), catchError(this.handleError)).toPromise();
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  distinctPets(pets: PetModel[]): PetModel[] {
    return [...new Set(pets.map(item => item.id))].map(id => {
      return {
        id: id
      };
    })
  }
}

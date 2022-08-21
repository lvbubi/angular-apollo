import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {retry, catchError, map} from 'rxjs/operators';
import {PetModel} from "../model/pet-model";
@Injectable({
  providedIn: 'root',
})
export class PetApiService {
  apiURL = '/konga/pet';
  constructor(private http: HttpClient) {}

  getAvailablePets(): Observable<PetModel[]> {
    return this.http
      .get<PetModel[]>(this.apiURL + '/findByStatus?status=available')
      .pipe(map(this.distinctPets), map(pets => pets.slice(0, 10)), retry(1), catchError(this.handleError));
  }

  getPetById(id: number): Observable<PetModel> {
    return this.http
      .get<PetModel>(this.apiURL + `/${id}`)
      .pipe(retry(1), catchError(this.handleError));
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

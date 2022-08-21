import {Injectable} from '@angular/core';
import {PetApi} from "./pet-api";
import {PetModel} from "../pet-example/model/pet-model";
import {gql} from "apollo-angular";
import {GenericGraphqlApiService} from "./generic-graphql-api.service";

@Injectable({
  providedIn: 'root',
})
export class PetGraphqlApiService implements PetApi {
  constructor(private apiService: GenericGraphqlApiService) {
  }

  getAvailablePets(): Promise<PetModel[]> {
    return this.apiService.genericGraphqlQuery('/pets', gql`
      {
        findPetsByStatus(status:PENDING){
          id
        }
      }
        `).then((result: any) => {
          return this.distinctPets(result);
    });
  }

  getPetById(id: number): Promise<any> {
    return this.apiService.genericGraphqlQuery('/pets', gql`
      {
        getPetById(petId:${id}) {
          status
          name
          category {name}
        }
      }
        `);
  }

  distinctPets(pets: PetModel[]): PetModel[] {
    return [...new Set(pets.map(item => item.id))].map(id => {
      return {
        id: id
      };
    })
  }
}

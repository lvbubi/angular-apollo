import { Injectable } from '@angular/core';
import {PetApi} from "./pet-api";
import {PetModel} from "../pet-example/model/pet-model";
import {Apollo, gql} from "apollo-angular";

@Injectable({
  providedIn: 'root',
})
export class PetGraphqlApiService implements PetApi {
  constructor(private apollo: Apollo) {
  }

  getAvailablePets(): Promise<PetModel[]> {
    return this.apollo.use("pets2")
      .watchQuery({
        query: gql`
          {
            findPetsByStatus(status:PENDING){
              id
            }
          }
        `,
      })
      .result().then((result: any) => {
        let pets: PetModel[] = result?.data?.findPetsByStatus as PetModel[];
        return this.distinctPets(pets);
      });
  }

  getPetById(id: number): Promise<PetModel> {
    return this.apollo.use("pets")
      .watchQuery({
        query: gql`
          {
            getPetById(petId:${id}) {
             status
             name
             category {name}
            }
          }
        `,
      }).result().then((result: any) => result?.data?.getPetById as PetModel);
  }

  distinctPets(pets: PetModel[]): PetModel[] {
    return [...new Set(pets.map(item => item.id))].map(id => {
      return {
        id: id
      };
    })
  }
}

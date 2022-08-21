import {Component, OnInit} from '@angular/core';
import {PetModel} from "../model/pet-model";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-pet-graphql',
  template: `
    <app-pet-component [pets]="pets"
                       [selectedPet]="selectedPet"
                       (selectedPetId)="loadPetDetails($event)">
    </app-pet-component>
  `
})
export class PetGraphqlComponent implements OnInit {

  pets: PetModel[];
  selectedPet: PetModel;

  constructor(private apollo: Apollo) {
    console.log('asdasdasd')
  }

  ngOnInit() {
    console.log('asd')
    this.apollo.use("pets2")
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
      this.pets = result?.data?.findPetsByStatus;
      this.pets = this.pets.slice(0, 10);
    });
  }

  loadPetDetails(petId) {
    this.apollo.use("pets")
      .watchQuery({
        query: gql`
          {
            getPetById(petId:${petId}) {
             status
             name
             category {name}
            }
          }
        `,
      }).result().then((result: any) => this.selectedPet = result?.data?.getPetById);
  }
}

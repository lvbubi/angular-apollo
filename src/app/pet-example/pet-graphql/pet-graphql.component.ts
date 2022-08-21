import {Component, OnInit} from '@angular/core';
import {PetModel} from "../model/pet-model";
import {gql} from "apollo-angular";
import {PetGraphqlApiService} from "../../service/pet-graphql-api.service";

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

  constructor(public petApi: PetGraphqlApiService) {
  }

  ngOnInit() {
    this.petApi.getAvailablePets().then(pets => {
      console.log('petGraphql', pets);
      this.pets = pets;
    })
  }

  loadPetDetails(petId) {
    this.petApi.getPetById(petId).then(pet => this.selectedPet = pet);
  }
}

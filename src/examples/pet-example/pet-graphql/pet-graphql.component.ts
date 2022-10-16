import {Component, OnInit} from '@angular/core';
import {PetModel} from "../model/pet-model";
import {PetGraphqlApiService} from "../../../app/service/pet-graphql-api.service";

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
    this.petApi.getAvailablePets().then(pets => this.pets = pets)
  }

  loadPetDetails(petId) {
    this.petApi.getPetById(petId).then(pet => this.selectedPet = pet);
  }
}

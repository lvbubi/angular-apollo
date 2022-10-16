import {Component, OnInit} from '@angular/core';
import {PetModel} from "../model/pet-model";
import {PetKongaApiService} from "../../../app/service/pet-konga-api.service";

@Component({
  selector: 'app-pet-konga',
  template: `
    <app-pet-component [pets]="pets"
                       [selectedPet]="selectedPet"
                       (selectedPetId)="loadPetDetails($event)">
    </app-pet-component>
  `
})
export class PetKongaComponent implements OnInit {

  pets: PetModel[];
  selectedPet: PetModel;

  constructor(public petApi: PetKongaApiService) {}

  ngOnInit() {
    this.petApi.getAvailablePets().then(pets => this.pets = pets)
  }

  loadPetDetails(petId) {
    this.petApi.getPetById(petId).then(pet => this.selectedPet = pet);
  }
}

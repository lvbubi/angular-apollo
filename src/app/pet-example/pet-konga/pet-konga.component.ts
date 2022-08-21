import {Component, OnInit} from '@angular/core';
import {PetModel} from "../model/pet-model";
import {PetApiService} from "./pet-api.service";

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

  constructor(public petApi: PetApiService) {}

  ngOnInit() {
    this.petApi.getAvailablePets().toPromise().then(pets => {
      console.log('asd', pets);
      this.pets = pets;
    })
  }

  loadPetDetails(petId) {
    this.petApi.getPetById(petId).toPromise().then(pet => this.selectedPet = pet);
  }
}

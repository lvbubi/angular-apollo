import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PetModel} from "../model/pet-model";

@Component({
  selector: 'app-pet-component',
  template: `
    <app-pet-names [pets]="pets" (onPetClick)="selectedPetId.emit($event)"></app-pet-names>
    <app-pet-details [pet]="selectedPet"></app-pet-details>
  `
})
export class PetComponent {
  @Input() pets: PetModel[];
  @Input() selectedPet: PetModel;
  @Output() selectedPetId: EventEmitter<number> = new EventEmitter<number>();
}

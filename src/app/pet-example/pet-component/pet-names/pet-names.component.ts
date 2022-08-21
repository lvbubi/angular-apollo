import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PetModel} from "../../model/pet-model";

@Component({
  selector: 'app-pet-names',
  templateUrl: './pet-names.component.html'
})
export class PetNamesComponent {
  @Input() pets: PetModel[];
  @Output() onPetClick = new EventEmitter<number>();

  onPetClickEvent(id: number) {
    this.onPetClick.emit(id);
  }
}

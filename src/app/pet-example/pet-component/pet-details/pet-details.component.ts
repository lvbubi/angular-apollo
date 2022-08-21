import {Component, Input} from '@angular/core';
import {PetModel} from "../../model/pet-model";

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html'
})
export class PetDetailsComponent {
  @Input() pet: PetModel;
}

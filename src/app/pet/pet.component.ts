import {Component} from '@angular/core';


@Component({
  selector: 'app-pet-component',
  template: `
    <app-pet-names (childToParent)="childToParent($event)"></app-pet-names>
    <app-pet-details [childToMaster]="petId"></app-pet-details>
  `
})
export class PetComponent {
  petId: number = 2


  childToParent(petId){this.petId=petId;}
}

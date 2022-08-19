import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PetComponent} from "./pet.component";
import {RouterModule} from "@angular/router";
import { PetNamesComponent } from './pet-names/pet-names.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';



@NgModule({
  declarations: [
    PetComponent,
    PetNamesComponent,
    PetDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'pets', component: PetComponent }
    ]),
  ]
})
export class PetModule { }

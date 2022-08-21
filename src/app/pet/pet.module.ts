import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { PetNamesComponent } from './pet-component/pet-names/pet-names.component';
import { PetDetailsComponent } from './pet-component/pet-details/pet-details.component';
import { PetGraphqlComponent } from './pet-graphql/pet-graphql.component';
import { PetComponent } from './pet-component/pet.component';
import {GraphQLModule} from "./pet-graphql/graphql.module";



@NgModule({
  declarations: [
    PetComponent,
    PetNamesComponent,
    PetDetailsComponent,
    PetGraphqlComponent
  ],
  imports: [
    CommonModule,
    GraphQLModule,
    RouterModule.forRoot([
      { path: 'pets', component: PetGraphqlComponent }
    ]),
  ]
})
export class PetModule { }

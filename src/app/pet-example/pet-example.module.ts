import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { PetNamesComponent } from './pet-component/pet-names/pet-names.component';
import { PetDetailsComponent } from './pet-component/pet-details/pet-details.component';
import { PetGraphqlComponent } from './pet-graphql/pet-graphql.component';
import { PetComponent } from './pet-component/pet.component';
import { GraphqlModule } from "../service/graphql.module";
import { PetKongaComponent } from "./pet-konga/pet-konga.component";
import { PetExampleComponent } from "./pet-example-component";



@NgModule({
  declarations: [
    PetComponent,
    PetNamesComponent,
    PetDetailsComponent,
    PetGraphqlComponent,
    PetKongaComponent,
    PetExampleComponent
  ],
  imports: [
    CommonModule,
    GraphqlModule,
    RouterModule.forRoot([
      { path: 'pets', component: PetExampleComponent }
    ])
  ]
})
export class PetExampleModule { }

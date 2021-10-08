import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PetComponent } from "./components/pet-component/pet.component";
import { RouterModule } from "@angular/router";
import { ChartBuilderModule } from "./chart-builder/chart-builder.module";

@NgModule({
  declarations: [
    AppComponent,
    PetComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'pets', component: PetComponent }
    ]),
    GraphQLModule,
    HttpClientModule,
    ChartBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PetComponent } from "./components/pet-component/pet.component";
import { ChartBuilderComponent } from './components/chart-builder/chart-builder.component';
import { RouterModule } from "@angular/router";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import { ChartTypeSelectorComponent } from './components/chart-builder/chart-type-selector/chart-type-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    ChartBuilderComponent,
    ChartTypeSelectorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'pets', component: PetComponent},
      {path: 'builder', component: ChartBuilderComponent}
    ]),
    GraphQLModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

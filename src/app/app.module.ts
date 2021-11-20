import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PetComponent } from "./components/pet-component/pet.component";
import { RouterModule } from "@angular/router";
import { ChartBuilderModule } from "./chart-builder/chart-builder.module";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ChartExampleModule } from "./chart-example/chart-example.module";

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
      StoreModule.forRoot({}),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      }),
      GraphQLModule,
      HttpClientModule,
      ChartBuilderModule,
      ChartExampleModule,
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

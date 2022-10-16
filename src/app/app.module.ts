import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { ChartBuilderModule } from "./chart-builder/chart-builder.module";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ChartExampleModule } from "./chart-example/chart-example.module";
import { PetExampleModule } from './pet-example/pet-example.module';
import {MatSidenavModule} from "@angular/material/sidenav";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { DataIntegrationModule } from './data-integration/data-integration.module';
import { ChartExportModule } from './chart-export/chart-export.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'builder', component: AppComponent}
    ]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    HttpClientModule,
    ChartBuilderModule,
    ChartExampleModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    PetExampleModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    DataIntegrationModule,
    ChartExportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

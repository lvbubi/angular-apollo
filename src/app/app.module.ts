import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { ChartBuilderModule } from "./chart-builder/chart-builder.module";
import { ChartExampleModule } from "../examples/chart-example/chart-example.module";
import { PetExampleModule } from '../examples/pet-example/pet-example.module';
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
    HttpClientModule,
    ChartBuilderModule,
    ChartExampleModule,
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

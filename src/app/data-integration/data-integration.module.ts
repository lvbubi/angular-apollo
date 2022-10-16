import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataSourceSelectorComponent} from "./data-source-selector/data-source-selector.component";
import {CustomDataSourceComponent} from "./data-source-selector/custom-data-source/custom-data-source.component";
import {GraphqlDataSourceComponent} from "./data-source-selector/graphql-data-source/graphql-data-source.component";
import {AutosizeInputComponent} from "./data-source-selector/input/autosize-input/autosize-input.component";
import {KongDataSourceComponent} from "./data-source-selector/kong-data-source/kong-data-source.component";
import {GraphqlInputComponent} from "./data-source-selector/input/graphql-input/graphql-input.component";
import {JsonInputComponent} from "./data-source-selector/input/json-input/json-input.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    DataSourceSelectorComponent,
    CustomDataSourceComponent,
    GraphqlDataSourceComponent,
    AutosizeInputComponent,
    KongDataSourceComponent,
    GraphqlInputComponent,
    JsonInputComponent
  ],
  exports: [
    DataSourceSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    TextFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class DataIntegrationModule { }

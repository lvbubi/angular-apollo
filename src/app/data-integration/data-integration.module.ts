import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataSourceSelectorComponent} from "./components/data-source-selector/data-source-selector.component";
import {CustomDataSourceComponent} from "./components/data-source-selector/custom-data-source/custom-data-source.component";
import {GraphqlDataSourceComponent} from "./components/data-source-selector/graphql-data-source/graphql-data-source.component";
import {AutosizeInputComponent} from "./components/input/autosize-input/autosize-input.component";
import {KongDataSourceComponent} from "./components/data-source-selector/kong-data-source/kong-data-source.component";
import {GraphqlInputComponent} from "./components/data-source-selector/graphql-data-source/graphql-input/graphql-input.component";
import {JsonInputComponent} from "./components/input/json-input/json-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
    KongDataSourceComponent,
    AutosizeInputComponent,
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

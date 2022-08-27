import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GenericGraphqlApiService} from "../../../../service/generic-graphql-api.service";
import {graphqlSyntaxValidator} from "../input/graphql-input/graphql-input.component";
import {jsonSyntaxValidator} from "../input/json-input/json-input.component";
import {parse} from "graphql";
import * as objectMapper from 'object-mapper'
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-graphql-data-source',
  templateUrl: './graphql-data-source.component.html'
})
export class GraphqlDataSourceComponent implements OnInit {

  @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

  graphqlApiFormControl = new FormControl('', [Validators.required, Validators.pattern("/[A-z]*")]);
  graphqlQueryFormControl = new FormControl('', [Validators.required, graphqlSyntaxValidator()]);
  mapperFormControl = new FormControl('', [Validators.required, jsonSyntaxValidator()]);

  form: FormGroup = this.formBuilder.group({
    mapper: this.mapperFormControl,
    graphqlQuery: this.graphqlQueryFormControl
  });

  constructor(private formBuilder: FormBuilder,
              private apiService: GenericGraphqlApiService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit() {
    this.apiService.genericGraphqlQuery(this.graphqlApiFormControl.value, parse(this.graphqlQueryFormControl.value))
      .then(result => {
        try {
          const dataMapper = JSON.parse(this.mapperFormControl.value);
          let mappedObject = objectMapper(result, dataMapper);
          if (mappedObject == undefined) {
            this._snackBar.open("Mapped result is empty", "Try a new mapper!", {
              duration: 5000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
            return;
          }
          this.resultEvent.emit(() => mappedObject);
        } catch (e) {
          console.log('semanticError', e);
          this._snackBar.open("Query result can not be mapped", "Try a new mapper!", {
            duration: 5000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        }
      });
  }

}

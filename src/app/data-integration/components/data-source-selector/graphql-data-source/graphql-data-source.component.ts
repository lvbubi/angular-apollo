import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GenericGraphqlApiService} from "../../../service/generic-graphql-api.service";
import {graphqlSyntaxValidator} from "./graphql-input/graphql-input.component";
import {jsonSyntaxValidator} from "../../input/json-input/json-input.component";
import {parse} from "graphql";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataTransformService} from "../../../service/data-transform.service";

@Component({
  selector: 'app-graphql-data-source',
  templateUrl: './graphql-data-source.component.html'
})
export class GraphqlDataSourceComponent {

  @Output() dataSource: EventEmitter<any> = new EventEmitter<any>();

  graphqlApiFormControl = new FormControl('', [Validators.required, Validators.pattern("/[A-z]*")]);
  graphqlQueryFormControl = new FormControl('', [Validators.required, graphqlSyntaxValidator()]);
  mapperFormControl = new FormControl('', [jsonSyntaxValidator()]);

  form: FormGroup = this.formBuilder.group({
    api: this.graphqlApiFormControl,
    mapper: this.mapperFormControl,
    graphqlQuery: this.graphqlQueryFormControl
  });

  constructor(private formBuilder: FormBuilder,
              private apiService: GenericGraphqlApiService,
              private dataTransformService: DataTransformService,
              private _snackBar: MatSnackBar) { }

  submit() {
    let api = this.graphqlApiFormControl.value;
    let query = this.graphqlQueryFormControl.value;
    let mapper = this.mapperFormControl.value;
    let event = this.dataSource;
    this.apiService.genericGraphqlQuery(api, parse(query))
      .then(result => {
        try {
          this.dataTransformService.transform(result, mapper, event);
        } catch (e) {
          this._snackBar.open(e, "Try a new mapper!", {
            duration: 5000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        }
      });
  }
}

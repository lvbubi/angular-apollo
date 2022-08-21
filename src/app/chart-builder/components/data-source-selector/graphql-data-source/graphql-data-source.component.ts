import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {jsonSyntaxValidator} from "../json-input/json-input.component";
import {GenericGraphqlApiService} from "../../../../service/generic-graphql-api.service";
import {parse} from "graphql";

@Component({
  selector: 'app-graphql-data-source',
  templateUrl: './graphql-data-source.component.html'
})
export class GraphqlDataSourceComponent implements OnInit {

  @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

  graphqlApiFormControl = new FormControl('', [Validators.required, Validators.pattern("/[A-z]*")]);
  graphqlQueryFormControl = new FormControl('', [jsonSyntaxValidator()]);
  mapperFormControl = new FormControl('', [jsonSyntaxValidator()]);

  form: FormGroup = this.formBuilder.group({
    mapper: this.mapperFormControl,
    graphqlQuery: this.graphqlQueryFormControl
  });

  constructor(private formBuilder: FormBuilder, private apiService: GenericGraphqlApiService) { }

  ngOnInit(): void {
  }

  submit() {
    console.log('process graphql query', this.graphqlApiFormControl.value, parse(this.graphqlQueryFormControl.value), this.mapperFormControl.value);
    this.apiService.genericGraphqlQuery(this.graphqlApiFormControl.value, parse(this.graphqlQueryFormControl.value))
      .then(result => console.log('dataSourceResult:', result));
  }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {jsonSyntaxValidator} from "../json-input/json-input.component";

@Component({
  selector: 'app-graphql-data-source',
  templateUrl: './graphql-data-source.component.html',
  styleUrls: ['./graphql-data-source.component.css']
})
export class GraphqlDataSourceComponent implements OnInit {

  @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

  graphqlQueryFormControl = new FormControl('', [jsonSyntaxValidator()]);
  mapperFormControl = new FormControl('', [jsonSyntaxValidator()]);

  form: FormGroup = this.formBuilder.group({
    mapper: this.mapperFormControl,
    graphqlQuery: this.graphqlQueryFormControl
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  submit() {
    console.log('process graphql query');
  }

}

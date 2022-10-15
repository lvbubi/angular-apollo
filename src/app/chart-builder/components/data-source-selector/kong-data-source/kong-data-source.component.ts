import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {jsonSyntaxValidator} from "../input/json-input/json-input.component";
import {GenericRestApiService} from "../../../../service/generic-rest-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as objectMapper from 'object-mapper'

@Component({
  selector: 'app-kong-data-source',
  templateUrl: './kong-data-source.component.html'
})
export class KongDataSourceComponent implements OnInit {

  @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

  restApiFormControl = new FormControl('', [Validators.required, Validators.pattern("/[A-z]*")]);
  mapperFormControl = new FormControl('', [Validators.required, jsonSyntaxValidator()]);
  methodTypeFormControl = new FormControl('GET', [Validators.required]);

  methods = ['GET', 'POST'];

  form: FormGroup = this.formBuilder.group({
    api: this.restApiFormControl,
    mapper: this.mapperFormControl
  });


  constructor(private formBuilder: FormBuilder,
              private apiService: GenericRestApiService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit() {
    this.apiService.genericRestApiCall(this.restApiFormControl.value, this.methodTypeFormControl.value)
      .then(result => {
        try {
          const dataMapper = JSON.parse(this.mapperFormControl.value);
          let mappedObject = objectMapper(result, dataMapper);
          console.log('MAPPED OBJECT', mappedObject);
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

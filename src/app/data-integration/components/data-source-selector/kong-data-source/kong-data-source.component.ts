import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {jsonSyntaxValidator} from "../../input/json-input/json-input.component";
import {GenericRestApiService} from "../../../service/generic-rest-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataTransformService} from "../../../service/data-transform.service";

@Component({
  selector: 'app-kong-data-source',
  templateUrl: './kong-data-source.component.html'
})
export class KongDataSourceComponent {

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
              private dataTransformService: DataTransformService,
              private _snackBar: MatSnackBar) { }

  submit() {
    this.apiService.genericRestApiCall(this.restApiFormControl.value, this.methodTypeFormControl.value)
      .then(result => {
        try {
          this.dataTransformService.processDataSource(result, this.mapperFormControl.value, this.resultEvent);
        } catch (e) {
          this._snackBar.open(e, "Try a new mapper!", {
            duration: 5000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        }
      });
  }
}

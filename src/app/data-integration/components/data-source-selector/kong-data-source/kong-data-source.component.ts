import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {jsonSyntaxValidator} from "../../input/json-input/json-input.component";
import {GenericRestApiService} from "../../../service/generic-rest-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataTransformService} from "../../../service/data-transform.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-kong-data-source',
  templateUrl: './kong-data-source.component.html'
})
export class KongDataSourceComponent {

  @Output() dataSource: EventEmitter<any> = new EventEmitter<any>();

  restApiFormControl = new FormControl('', [Validators.required, Validators.pattern("/[A-z]*")]);
  mapperFormControl = new FormControl('', [jsonSyntaxValidator()]);
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
    let api = this.restApiFormControl.value;
    let requestMethod = this.methodTypeFormControl.value;
    let mapper = this.mapperFormControl.value;
    let event = this.dataSource;

    this.apiService.genericRestApiCall(api, requestMethod)
      .then(result => {
        try {
          this.dataTransformService.transform(result, mapper, event);
        } catch (e) {
          this.exceptionHandler(e, "Try a new mapper!");
        }
      }, (error: HttpErrorResponse) =>
        this.exceptionHandler(error.url, "Invalid API call"));
  }

  exceptionHandler(exception, message) {
    this._snackBar.open(exception, message, {
      duration: 5000,
      panelClass: ['red-snackbar','login-snackbar'],
    });
  }
}

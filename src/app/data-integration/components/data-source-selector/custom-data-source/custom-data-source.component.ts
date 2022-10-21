import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {jsonSyntaxValidator} from "../../input/json-input/json-input.component";
import {DataTransformService} from "../../../service/data-transform.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-custom-data-source',
  templateUrl: './custom-data-source.component.html'
})
export class CustomDataSourceComponent {

  dataSourceFormControl = new FormControl('', [Validators.required, jsonSyntaxValidator(true)]);
  mapperFormControl = new FormControl('', [jsonSyntaxValidator()]);

  form: FormGroup = this.formBuilder.group({
    mapper: this.mapperFormControl,
    dataSource: this.dataSourceFormControl
  });

  @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              private dataTransformService: DataTransformService,
              private _snackBar: MatSnackBar) {}

  submit() {
    try {
      const dataSource = JSON.parse(this.dataSourceFormControl.value);
      this.dataTransformService.transform(dataSource, this.mapperFormControl.value, this.resultEvent);
    } catch (e) {
      this._snackBar.open(e, "Try a new mapper!", {
        duration: 5000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }
  }

  isDisabled(): boolean {
    return this.mapperFormControl.invalid || this.dataSourceFormControl.invalid;
  }
}

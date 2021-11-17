import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

import * as objectMapper from 'object-mapper'

import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import {Store} from "@ngrx/store";
import {State} from "../../../store/chart.reducer";
import {ChartActions} from "../../../store/chart.actions";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function jsonSyntaxValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    try {
      JSON.parse(value);
      return null;
    } catch (e) {
      return { syntaxError:true };
    }
  }
}

@Component({
  selector: 'app-data-source-mapper',
  templateUrl: './data-source-mapper.component.html',
  styleUrls: ['./data-source-mapper.component.css']
})
export class DataSourceMapperComponent {
  dataSourceFormControl = new FormControl('', [jsonSyntaxValidator()]);
  mapperFormControl = new FormControl('', [jsonSyntaxValidator()]);

  matcher = new MyErrorStateMatcher();

  @Input() resultEvent: EventEmitter<any>;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private store: Store<State>) {}

  /**
   [
    {
     "name": "Germanya",
     "value": 406321,
     "extra": {
        "code": "de"
      }
     },
     {
     "name": "Germany",
     "value": 40632,
     "extra": {
        "code": "de"
      }
     }
   ]

   {
    "[].name": "[].name",
    "[].value": "[].value",
    "[].extra": "[].extra"
   }
   */
  submit() {
    if (!this.mapperFormControl.value) {
      this.resultEvent.emit(() => JSON.parse(this.dataSourceFormControl.value));
      return;
    }

    try {
      const mapper = JSON.parse(this.mapperFormControl.value);
      this.store.dispatch(new ChartActions.SetDataMapperAction(mapper));

      let mappedObject = objectMapper(JSON.parse(this.dataSourceFormControl.value), mapper);
      this.resultEvent.emit(() => mappedObject);
    } catch (e) {
      this.mapperFormControl.setErrors({ semanticError: true });
    }
  }
}

import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

import {
  AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn
} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

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
  selector: 'json-output-component',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.css']
})
export class JsonInputComponent {
  @Input() formControlInput: AbstractControl;
  @Input() label: string;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  matcher = new MyErrorStateMatcher();

  constructor() {}

  formControl(): FormControl {
    return this.formControlInput as FormControl;
  }

  validateForm() {
    try {
      JSON.parse(this.formControlInput.value);
    } catch (e) {
      this.formControlInput.setErrors({ semanticError: true });
    }
  }
}

import {Component, Input, ViewChild} from '@angular/core';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

import {
  AbstractControl, FormControl, ValidationErrors, ValidatorFn
} from "@angular/forms";

export function jsonSyntaxValidator(required?: boolean): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    // if empty no validation is needed
    if (required && !value) {
      return { syntaxError:true };
    }

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
  selector: 'json-input-component',
  templateUrl: './json-input.component.html'
})
export class JsonInputComponent {
  @Input() formControlInput: AbstractControl;
  @Input() label: string;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor() {}

  formControl(): FormControl {
    return this.formControlInput as FormControl;
  }
}

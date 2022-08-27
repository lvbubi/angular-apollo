import {Component, Input, ViewChild} from '@angular/core';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

import {
  AbstractControl, FormControl, ValidationErrors, ValidatorFn
} from "@angular/forms";

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

  validateForm() {
    try {
      JSON.parse(this.formControlInput.value);
    } catch (e) {
      this.formControlInput.setErrors({ syntaxError: true });
    }
  }
}

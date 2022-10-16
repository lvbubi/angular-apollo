import {Component, Input, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {parse} from "graphql";

export function graphqlSyntaxValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    try {
      parse(value);
      return null;
    } catch (e) {
      return { syntaxError:true };
    }
  }
}

@Component({
  selector: 'graphql-input-component',
  templateUrl: './graphql-input.component.html'
})
export class GraphqlInputComponent {

  @Input() formControlInput: AbstractControl;
  @Input() label: string;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor() {}

  formControl(): FormControl {
    return this.formControlInput as FormControl;
  }

  validateForm() {
    try {
      console.log('before parse:', this.formControlInput.value);
      parse(this.formControlInput.value);
    } catch (e) {
      console.log('PARSE FAILED: ', e);
      this.formControlInput.setErrors({ syntaxError: true });
    }
  }
}

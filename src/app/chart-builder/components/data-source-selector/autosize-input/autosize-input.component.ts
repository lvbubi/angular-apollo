import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { FormControl} from "@angular/forms";

@Component({
  selector: 'app-autosize-input',
  templateUrl: './autosize-input.component.html',
  styleUrls: ['./autosize-input.component.css']
})
export class AutosizeInputComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  @Input() formControlInput: FormControl

  @Input() label: string;

  @Output() validationEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
}

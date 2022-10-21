import {Component, EventEmitter, Input, Output} from '@angular/core';

import { InputFormat } from 'chart-adapter'

@Component({
  selector: 'input-format-selector',
  templateUrl: './input-format.component.html',
  styleUrls: ['./input-format.component.css']
})
export class InputFormatComponent {
  inputFormats: InputFormat[];

  selectedInputFormat: InputFormat;

  @Output()
  selectInputFormatEvent = new EventEmitter<InputFormat>();

  @Input()
  chartType: string;

  constructor() {
    this.inputFormats = Object.keys(InputFormat)
      .filter(value => isNaN(Number(value)) === false)
      .map(key => InputFormat[key])
  }

  selectDataType(selectedInputFormat: InputFormat) {
    this.selectedInputFormat = selectedInputFormat;
    this.selectInputFormatEvent.emit(selectedInputFormat);
  }
}

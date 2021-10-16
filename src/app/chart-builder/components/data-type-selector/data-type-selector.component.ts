import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-type-selector',
  templateUrl: './data-type-selector.component.html',
  styleUrls: ['./data-type-selector.component.css']
})
export class DataTypeSelectorComponent implements OnInit {

  @Input() chartGroups: any;
  @Input() chartType: string;
  @Output() selectEvent = new EventEmitter<string>();

  inputFormats: [];
  inputFormat: string;

  constructor() { }

  ngOnInit(): void {
    // Fetch enabled inputFormats from chartGroups
    this.inputFormats = this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .map(chart => chart.inputFormat)
      .filter((value, index, self) => self.indexOf(value) === index);

    // Get currently selected charts inputFormat
    this.inputFormat = this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .filter(chart => chart.selector === this.chartType)[0].inputFormat;

    // Must be emitted
    this.selectEvent.emit(this.inputFormat);
  }

  selectDataType(selectedInputFormat: string) {
    console.log('dataTypeSelectorComponent', selectedInputFormat);
    this.selectEvent.emit(selectedInputFormat);
  }
}

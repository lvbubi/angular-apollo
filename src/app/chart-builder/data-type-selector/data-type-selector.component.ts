import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-data-type-selector',
  templateUrl: './data-type-selector.component.html',
  styleUrls: ['./data-type-selector.component.css']
})
export class DataTypeSelectorComponent implements OnInit {

  @Input() chartGroups: any;
  @Output() selectEvent = new EventEmitter<string>();

  dataTypes: [];
  inputFormat: string;

  constructor() { }

  ngOnInit(): void {
    this.dataTypes = this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .map(chart => chart.inputFormat)
      .filter((value, index, self) => self.indexOf(value) === index);

    this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .flatMap(chart =>  chart.options)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  selectDataType(selectedInputFormat: string) {
    this.selectEvent.emit(selectedInputFormat);
  }

}

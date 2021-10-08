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
  dataType: string;

  constructor() { }

  ngOnInit(): void {
    this.dataTypes = this.chartGroups
      .filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .map(chart => chart.inputFormat)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  selectDataType(selectedData: string) {
    this.selectEvent.emit(selectedData);
  }

}

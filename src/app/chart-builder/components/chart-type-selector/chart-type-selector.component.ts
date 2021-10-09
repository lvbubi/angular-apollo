import {Component, Input, OnInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css']
})
export class ChartTypeSelectorComponent implements OnInit {

  @Input() chartType: string;
  @Input() chartGroups: any;
  @Output() selectEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectChart(chartSelector: string) {
    this.selectEvent.emit(chartSelector)
    console.log(chartSelector);
  }

}

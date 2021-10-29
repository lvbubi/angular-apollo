import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

@Component({
  selector: 'app-data-source-mapper',
  templateUrl: './data-source-mapper.component.html',
  styleUrls: ['./data-source-mapper.component.css']
})
export class DataSourceMapperComponent implements OnInit {

  @Input() resultEvent: EventEmitter<any>;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  textArea: string;

  mapper: string

  constructor() { }

  ngOnInit(): void {
  }

  /**
   [{
   "name": "Germany",
   "value": 40632,
   "extra": {
      "code": "de"
    }
   }]
   */
  setDataSource() {
    this.resultEvent.emit(() => JSON.parse(this.textArea));
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {jsonSyntaxValidator} from "../json-input/json-input.component";
import {Store} from "@ngrx/store";
import {State} from "../../../store/chart.reducer";
import * as objectMapper from 'object-mapper'
import {ChartActions} from "../../../store/chart.actions";


@Component({
  selector: 'app-custom-data-source',
  templateUrl: './custom-data-source.component.html',
  styleUrls: ['./custom-data-source.component.css']
})
export class CustomDataSourceComponent implements OnInit {

  dataSourceFormControl = new FormControl('', [jsonSyntaxValidator()]);
  mapperFormControl = new FormControl('', [jsonSyntaxValidator()]);

  form: FormGroup = this.formBuilder.group({
    mapper: this.mapperFormControl,
    dataSource: this.dataSourceFormControl
  });

  @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  submit() {
    try {
      const dataSource = JSON.parse(this.dataSourceFormControl.value);
      const dataMapper = JSON.parse(this.mapperFormControl.value);

      let mappedObject = objectMapper(dataSource, dataMapper);

      this.store.dispatch(new ChartActions.SetDataMapperAction(dataMapper));
      this.resultEvent.emit(() => mappedObject);
    } catch (e) {
      this.dataSourceFormControl.setErrors({ semanticError: true });
    }
  }
}

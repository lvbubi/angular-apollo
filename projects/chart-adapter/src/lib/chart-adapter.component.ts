import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {colorSets, escapeLabel, formatLabel, MultiSeries, SingleSeries} from "@swimlane/ngx-charts";

import {Configuration} from "./models/configuration";
import {DataSourceMapper} from "./data-source-mapper.service";

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });

@Component({
  selector: 'chart-adapter-component',
  templateUrl: './chart-adapter.component.html',
  styleUrls: ['./chart-adapter.component.css']
})
export class ChartAdapterComponent implements OnInit, OnChanges {

  @Input() configuration: Configuration;
  @Input() dataSource: any;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() activate: EventEmitter<any> = new EventEmitter<any>();
  @Output() deactivate: EventEmitter<any> = new EventEmitter<any>();

  data: SingleSeries | MultiSeries;

  constructor(private chartAdapterService: DataSourceMapper) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = this.chartAdapterService.map(this.dataSource, this.configuration.dataMapper);
  }


  ngOnInit(): void {
    //TODO: Ez így gány, javítani kell
    if (!this.configuration.chartOptions.colorScheme) {
      this.configuration.chartOptions.colorScheme = this.findColorScheme('cool');
    }
  }

  findColorScheme(name) {
    return colorSets.find(s => s.name === name);
  }

  dblclick(event) {
    console.log('Double click', event);
  }

  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">$${val}</span>
    `;
  }

  valueFormatting(value: number): string {
    return `${Math.round(value).toLocaleString()} €`;
  }

  calendarAxisTickFormatting(mondayString: string) {
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth() ? monthName.format(nextSunday) : '';
  }

  calendarTooltipText(c): string {
    return `
      <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data.toLocaleString()}</span>
    `;
  }
}

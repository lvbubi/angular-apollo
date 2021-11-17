import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartOptions } from "./models/chart-options";
import { escapeLabel, formatLabel } from "@swimlane/ngx-charts";

import * as objectMapper from 'object-mapper'

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });

@Component({
  selector: 'app-chart-adapter',
  templateUrl: './chart-adapter.component.html',
  styleUrls: ['./chart-adapter.component.css']
})
export class ChartAdapterComponent implements OnInit {

  @Input() options: ChartOptions;
  @Input() chartType: string;
  @Input() view: [number, number];
  @Input() data: any;
  @Input() mapper: Object;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() activate: EventEmitter<any> = new EventEmitter<any>();
  @Output() deactivate: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if (this.mapper) {
      this.data = objectMapper(this.data, this.mapper);
    }
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

  currencyFormatting(value: number) {
    return `\$${Math.round(value).toLocaleString()}`;
  }

  gdpLabelFormatting(c) {
    return `${escapeLabel(c.label)}<br/><small class="number-card-label">GDP Per Capita</small>`;
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

import {ChartOptions} from "./chart-options";

export interface Configuration {
  chartType: string;
  dataMapper?: any;
  chartOptions: Partial<ChartOptions>;
  view: [number, number];
}

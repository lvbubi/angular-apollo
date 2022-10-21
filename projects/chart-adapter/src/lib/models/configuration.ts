import {ChartOptions} from "./chart-options";
import {InputFormat} from "./input-format";

export interface Configuration {
  chartType: string;
  dataMapper?: any;
  chartOptions: Partial<ChartOptions>;
  view: [number, number];
  inputFormat: InputFormat;
}

import { Injectable } from '@angular/core';
import { ConfigurationModel } from "../model/configuration-model";
import { Store } from "@ngrx/store";
import { Configuration, State } from "../../../store/chart.reducer";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationParserService {

  configuration: ConfigurationModel = new ConfigurationModel();
  constructor(private store: Store<State>) {
    this.configuration.headers.push('ChartOptions');
  }

  createTypescriptFile(chartGroups, chartType, options) {
    this.configuration.body.push({
      header: 'ChartOptions',
      data: this.mapOptionsToTypeScript(chartGroups, chartType, options)
    });

    const headerString = this.configuration.headers.map(header => `import { ${header} } from "chart-adapter";\n`).toString();
    const bodyString = this.configuration.body.map(body => `export const configuration: ${body.header} = { ${body.data} \n}`).toString()

    return headerString + bodyString;
  }

  private mapOptionsToTypeScript(chartGroups, chartType, options) {
    return chartGroups.filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .filter(chart => chart.selector === chartType)
      .flatMap(chart => chart.options)
      .map(option => `\n\t${option}: ${JSON.stringify(options[option])}`);
  }

  createJsonFile(configuration: Configuration, chartGroups) {
    const initialValue = {};
    return chartGroups.filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .filter(chart => chart.selector === configuration.chartType)
      .flatMap(chart => chart.options)
      .reduce((obj, item) => {
        console.log(obj, item);
        return {
          ...obj,
          [item]: configuration.chartOptions[item],
        };
      }, initialValue);
  }
}

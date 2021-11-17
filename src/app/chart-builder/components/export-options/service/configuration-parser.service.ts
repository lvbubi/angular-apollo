import { Injectable } from '@angular/core';
import { ConfigurationModel } from "../model/configuration-model";
import { Store } from "@ngrx/store";
import { Configuration, State } from "../../../store/chart.reducer";
import chartGroups from "../../../chartTypes";
import {configurationSelector} from "../../../store/chart.selectors";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationParserService {

  exportConfigurationModel: ConfigurationModel = new ConfigurationModel();
  configuration: Configuration;

  constructor(private store: Store<State>) {
    store.select(configurationSelector).subscribe(configuration => this.configuration = configuration);
    this.exportConfigurationModel.headers.push('ChartOptions');
  }

  createTypescriptFile() {
    this.exportConfigurationModel.body.push({
      header: 'ChartOptions',
      data: this.mapOptionsToTypeScript()
    });

    const headerString = this.exportConfigurationModel.headers.map(header => `import { ${header} } from "chart-adapter";\n`).toString();
    const bodyString = this.exportConfigurationModel.body.map(body => `export const configuration: ${body.header} = { ${body.data} \n}`).toString()

    return headerString + bodyString;
  }

  private mapOptionsToTypeScript() {
    return this.getAvailableChartOptions()
      .map(option => `\n\t${option}: ${JSON.stringify(this.configuration.chartOptions[option])}`);
  }

  mapOptionsToObject() {
    const initialValue = {};
    return this.getAvailableChartOptions()
      .reduce((obj, item) => {
        return { ...obj, [item]: this.configuration.chartOptions[item] };
      }, initialValue);
  }

  getAvailableChartOptions(): Array<any> {
    return chartGroups.filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .filter(chart => chart.selector === this.configuration.chartType)
      .flatMap(chart => chart.options)
  }
}

import { Injectable } from '@angular/core';
import { ConfigurationModel } from "../model/configuration-model";
import chartGroups from "../../chart-builder/chartTypes";
import { Configuration } from "chart-adapter";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationParserService {

  exportConfigurationModel: ConfigurationModel = new ConfigurationModel();

  constructor() {
    this.exportConfigurationModel.headers.push('Configuration');
  }

  createTypescriptFile(configuration: Configuration) {
    const headerString = this.exportConfigurationModel.headers.map(header => `import { ${header} } from "chart-adapter";\n`).toString();


    Object.keys(configuration).forEach(key => {
      this.exportConfigurationModel.body.push({
        key: key,
        values: JSON.stringify(configuration[key], null, 4)
      });
    })

    const asd: string = this.exportConfigurationModel.body.map(entry => `\n  ${entry.key}: ${entry.values}`).toString();


    return headerString + `export const configuration: Configuration = { ${asd} \n}`;
  }

  mapOptionsToObject(configuration: Configuration) {
    const initialValue = {};
    return this.getAvailableChartOptions(configuration)
      .reduce((obj, item) => {
        return { ...obj, [item]: configuration.chartOptions[item] };
      }, initialValue);
  }

  getAvailableChartOptions(configuration: Configuration): Array<any> {
    return chartGroups.filter(group => !group.disabled)
      .flatMap(group => group.charts)
      .filter(chart => chart.selector === configuration.chartType)
      .flatMap(chart => chart.options)
  }
}

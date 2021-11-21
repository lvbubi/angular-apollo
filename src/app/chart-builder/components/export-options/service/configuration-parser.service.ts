import { Injectable } from '@angular/core';
import { ConfigurationModel } from "../model/configuration-model";
import { Store } from "@ngrx/store";
import { State } from "../../../store/chart.reducer";
import chartGroups from "../../../chartTypes";
import { configurationSelector } from "../../../store/chart.selectors";
import { Configuration } from "chart-adapter";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationParserService {

  exportConfigurationModel: ConfigurationModel = new ConfigurationModel();
  configuration: Configuration;

  constructor(private store: Store<State>) {
    store.select(configurationSelector).subscribe(configuration => {
      this.configuration = _.cloneDeep(configuration);
      this.configuration.chartOptions = this.mapOptionsToObject();
    });
    this.exportConfigurationModel.headers.push('Configuration');
  }

  createTypescriptFile() {
    const headerString = this.exportConfigurationModel.headers.map(header => `import { ${header} } from "chart-adapter";\n`).toString();


    Object.keys(this.configuration).forEach(key => {
      this.exportConfigurationModel.body.push({
        key: key,
        values: JSON.stringify(this.configuration[key], null, 4)
      });
    })

    const asd: string = this.exportConfigurationModel.body.map(entry => `\n  ${entry.key}: ${entry.values}`).toString();


    return headerString + `export const configuration: Configuration = { ${asd} \n}`;
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

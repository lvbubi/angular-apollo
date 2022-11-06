import { Injectable } from '@angular/core';
import { ConfigurationModel } from "../model/configuration-model";
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
    const headerString = this.exportConfigurationModel.headers
      .map(header => `import { ${header} } from "chart-adapter";\n`)
      .toString();


    Object.keys(configuration).forEach(key => {
      this.exportConfigurationModel.body.push({
        key: key,
        values: JSON.stringify(configuration[key], null, 4)
      });
    })

    const configurationBody: string = this.exportConfigurationModel.body
      .map(entry => `\n  ${entry.key}: ${entry.values}`)
      .toString();

    return headerString + `export const configuration: Configuration = { ${configurationBody} \n}`;
  }
}

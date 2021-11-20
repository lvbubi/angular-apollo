export class ConfigurationModel {
  headers: Array<string> = [];
  body: Array<{
    key: string,
    values: any
  }> = [];
}

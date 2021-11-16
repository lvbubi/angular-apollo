export class ConfigurationModel {
  headers: Array<string> = [];
  body: Array<{
    header: string,
    data: any
  }> = [];
}

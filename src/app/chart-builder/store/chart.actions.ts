import { Action } from '@ngrx/store';
import { ChartOptions, Configuration } from "chart-adapter";

export namespace ChartActions {

  export enum ChartAction {
    SET_CHART_TYPE = 'SET_CHART_TYPE',
    SET_INPUT_FORMAT = 'SET_INPUT_FORMAT',
    SET_CHART_GROUPS = 'SET_CHART_GROUPS',
    SET_DATA_MAPPER = 'SET_DATA_MAPPER',
    SET_COLOR_SCHEME = 'SET_COLOR_SCHEME',
    SET_CHART_OPTIONS = 'SET_CHART_OPTIONS',
    SET_CONFIGURATION = 'SET_CONFIGURATION'
  }

  export class SetChartTypeAction implements Action {
    readonly type: string = ChartAction.SET_CHART_TYPE;

    constructor(public chartType: String | undefined) {}
  }

  export class SetInputFormatAction implements Action {
    readonly type: string = ChartAction.SET_INPUT_FORMAT;

    constructor(public inputFormat: String | undefined) {}
  }

  export class SetChartGroupsAction implements Action {
    readonly type: string = ChartAction.SET_CHART_GROUPS;

    constructor(public chartGroups: any) {}
  }

  export class SetDataMapperAction implements Action {
    readonly type: string = ChartAction.SET_DATA_MAPPER;

    constructor(public dataMapper: Object) {}
  }

  export class SetColorSchemeAction implements Action {
    readonly type: string = ChartAction.SET_COLOR_SCHEME;

    constructor(public colorScheme: any) {}
  }

  export class SetChartOptionsAction implements Action {
    readonly type: string = ChartAction.SET_CHART_OPTIONS;

    constructor(public chartOptions: ChartOptions) {}
  }

  export class SetConfigurationAction implements Action {
    readonly type: string = ChartAction.SET_CONFIGURATION;

    constructor(public configuration: Configuration) {
    }
  }

  export type Actions = SetChartTypeAction | SetInputFormatAction | SetChartGroupsAction | SetDataMapperAction
    | SetColorSchemeAction | SetChartOptionsAction | SetConfigurationAction;
}

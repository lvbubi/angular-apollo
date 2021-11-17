import { Action } from '@ngrx/store';

export namespace ChartActions {

  export enum ChartAction {
    SET_CHART_TYPE = 'SET_CHART_TYPE',
    SET_INPUT_FORMAT = 'SET_INPUT_FORMAT',
    SET_CHART_GROUPS = 'SET_CHART_GROUPS',
    SET_DATA_MAPPER = 'SET_DATA_MAPPER'
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

  export type Actions = SetChartTypeAction | SetInputFormatAction | SetChartGroupsAction | SetDataMapperAction;
}

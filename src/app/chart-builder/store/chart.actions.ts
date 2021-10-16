import { Action } from '@ngrx/store';

export namespace ChartActions {

  export enum ChartAction {
    SET_CHART_TYPE = 'SET_CHART_TYPE',
    SET_INPUT_FORMAT = 'SET_INPUT_FORMAT'
  }

  export class SetChartTypeAction implements Action {
    readonly type: string = ChartAction.SET_CHART_TYPE;

    constructor(public chartType: String | undefined) {}
  }

  export class SetInputFormatAction implements Action {
    readonly type: string = ChartAction.SET_INPUT_FORMAT;

    constructor(public inputFormat: String | undefined) {}
  }


  export type Actions = SetChartTypeAction | SetInputFormatAction;
}

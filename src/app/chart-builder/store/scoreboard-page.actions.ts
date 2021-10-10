import {Action} from '@ngrx/store';

export namespace ChartActions {

  export enum ChartAction {
    SET_TYPE= 'SET_TYPE',
  }

  export class SetChartTypeAction implements Action {
    readonly type: string = ChartAction.SET_TYPE;

    constructor(public chartType: String | undefined) {
    }
  }

  export type Actions = SetChartTypeAction;
}

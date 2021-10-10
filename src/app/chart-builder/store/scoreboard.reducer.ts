import {
  createFeatureSelector,
} from '@ngrx/store';
import { ChartActions } from "./scoreboard-page.actions";


export interface State {
  inputFormat: string;
  chartType: string;
}

export const scoreboardFeatureKey = 'game';
export const getState = createFeatureSelector(scoreboardFeatureKey);

export const initialState: State = {
  chartType: 'bar-vertical',
  inputFormat: 'singleSeries'
};

export function reducer(state: State = initialState, action: ChartActions.Actions) {
  switch (action.type) {
    case ChartActions.ChartAction.SET_TYPE: {
      return {
        ...state,
        chartType: action.chartType,
      };
    }
    default:
      return state;
  }
}

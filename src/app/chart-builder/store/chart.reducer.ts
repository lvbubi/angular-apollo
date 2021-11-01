import {
  createFeatureSelector,
} from '@ngrx/store';
import { ChartActions } from "./chart.actions";


export interface State {
  chartGroups: any; //visible
  inputFormat: string;
  chartType: string;
}

export const scoreboardFeatureKey = 'game';
export const getState = createFeatureSelector(scoreboardFeatureKey);

export const initialState: State = {
  chartType: 'bar-vertical',
  inputFormat: 'singleSeries',
  chartGroups: undefined
};

export function reducer(state: State = initialState, action: ChartActions.Actions) {
  switch (action.type) {
    case ChartActions.ChartAction.SET_CHART_TYPE: {
      return {
        ...state,
        chartType: (action as ChartActions.SetChartTypeAction).chartType
      };
    }
    case ChartActions.ChartAction.SET_INPUT_FORMAT: {
      return {
        ...state,
        inputFormat: (action as ChartActions.SetInputFormatAction).inputFormat
      };
    }
    case ChartActions.ChartAction.SET_CHART_GROUPS: {
      return {
        ...state,
        chartGroups: (action as ChartActions.SetChartGroupsAction).chartGroups
      };
    }
    default:
      return state;
  }
}

import {
  createFeatureSelector,
} from '@ngrx/store';
import { ChartActions } from "./chart.actions";
import {ChartOptions} from "../../../../projects/chart-adapter/src/lib/models/chart-options";


export interface State {
  chartGroups: any; //visible
  inputFormat: string;
  configuration: Configuration
}

export interface Configuration {
  chartType: string;
  dataMapper: Object;
  chartOptions: ChartOptions;
}

export const scoreboardFeatureKey = 'game';
export const getState = createFeatureSelector(scoreboardFeatureKey);

export const initialState: State = {
  configuration: {
    dataMapper: undefined,
    chartType: 'bar-vertical',
    chartOptions: new ChartOptions()
  },
  inputFormat: 'singleSeries',
  chartGroups: undefined,
};

export function reducer(state: State = initialState, action: ChartActions.Actions) {
  switch (action.type) {
    case ChartActions.ChartAction.SET_CHART_TYPE: {
      return {
        ...state,
        configuration: {
          ...state.configuration, chartType: (action as ChartActions.SetChartTypeAction).chartType
        }
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
    case ChartActions.ChartAction.SET_DATA_MAPPER: {
      return {
        ...state,
        configuration: {
          ...state.configuration, dataMapper: (action as ChartActions.SetDataMapperAction).dataMapper
        }
      };
    }
    default:
      return state;
  }
}

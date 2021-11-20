import {
  createFeatureSelector,
} from '@ngrx/store';
import { ChartActions } from "./chart.actions";
import { Configuration } from "chart-adapter";

export interface State {
  chartGroups: any; //visible
  inputFormat: string;
  configuration: Configuration
}

export const scoreboardFeatureKey = 'game';
export const getState = createFeatureSelector(scoreboardFeatureKey);

export const initialState: State = {
  configuration: undefined,
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
    case ChartActions.ChartAction.SET_COLOR_SCHEME: {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          chartOptions: {
            ...state.configuration.chartOptions, colorScheme: (action as ChartActions.SetColorSchemeAction).colorScheme
          }

        }
      }
    }
    case ChartActions.ChartAction.SET_CHART_OPTIONS: {
      return {
        ...state,
        configuration: {
          ...state.configuration, chartOptions: (action as ChartActions.SetChartOptionsAction).chartOptions
        }
      }
    }
    case ChartActions.ChartAction.SET_CONFIGURATION: {
      return {
        ...state,
        configuration: (action as ChartActions.SetConfigurationAction).configuration
      }
    }
    default:
      return state;
  }
}

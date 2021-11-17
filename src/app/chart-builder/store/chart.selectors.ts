import {
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { Configuration, getState, State } from "./chart.reducer";

export const selectInputFormat = (state: State) => state.inputFormat;
export const selectChartType = (state: State) => state.configuration.chartType;
export const selectDataMapper = (state: State) => state.configuration.dataMapper;
export const selectConfiguration = (state: State) => state.configuration;

export const chartTypeSelector: MemoizedSelector<State, string> = createSelector(
  getState,
  selectChartType
);

export const inputFormatSelector: MemoizedSelector<State, string> = createSelector(
  getState,
  selectInputFormat
);

export const dataMapperSelector: MemoizedSelector<State, Object> = createSelector(
  getState,
  selectDataMapper
);

export const configurationSelector: MemoizedSelector<State, Configuration> = createSelector(
  getState,
  selectConfiguration
)

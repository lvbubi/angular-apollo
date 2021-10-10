import {
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { getState, State } from "./scoreboard.reducer";

export const selectInputFormat = (state: State) => state.inputFormat;
export const selectChartType = (state: State) => state.chartType;

export const chartTypeSelector: MemoizedSelector<State, string> = createSelector(
  getState,
  selectChartType
);

export const inputFormatSelector: MemoizedSelector<State, string> = createSelector(
  getState,
  selectInputFormat
);

import {
  Action,
  createFeatureSelector,
  createReducer,
  on
} from '@ngrx/store';
import * as ScoreboardPageActions from './scoreboard-page.actions'


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

const scoreboardReducer = createReducer(
  initialState,
  //on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 }))
);

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}

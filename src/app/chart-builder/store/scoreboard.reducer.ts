import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  MemoizedSelector,
  on
} from '@ngrx/store';
import * as ScoreboardPageActions from './scoreboard-page.actions'


export interface State {
  home: number;
  away: number;
}

export const scoreboardFeatureKey = 'game';
export const getState = createFeatureSelector(scoreboardFeatureKey);

export const initialState: State = {
  home: 10,
  away: 10,
};

export const selectHome = (state: State) => state.home;

export const homeSelector: MemoizedSelector<State, number | undefined> = createSelector(
  getState,
  selectHome
);

const scoreboardReducer = createReducer(
  initialState,
  on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
  on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
  on(ScoreboardPageActions.resetScore, () => ({ home: 0, away: 0 })),
  on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
);

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}

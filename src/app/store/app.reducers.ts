import {ActionReducerMap} from '@ngrx/store';

 import * as fromGame from '../game/store/game-reducers';

export interface AppState {
   GameState: fromGame.State,
}

export const reducers: ActionReducerMap<AppState> = {
  GameState: fromGame.gameReducer
};

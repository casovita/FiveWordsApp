import {ActionReducerMap} from '@ngrx/store';

import * as fromGame from './game/game-reducers';
import * as fromUser from './user/user.reducers'

export interface AppState {
  GameState: fromGame.State,
  UserState: fromUser.State
}

export const reducers: ActionReducerMap<AppState> = {
  GameState: fromGame.gameReducer,
  UserState: fromUser.userReducer
};

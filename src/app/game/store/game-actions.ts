import {Action} from '@ngrx/store';
import {GameType, IGameSettings} from './game-reducers';

export const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';
export const SET_GAME_TYPE = 'SET_GAME_TYPE';

export class SetGameSettings implements Action {
  readonly type = SET_GAME_SETTINGS;

  constructor(public payload: IGameSettings) {
  }
}

export class SetGameType implements Action {
  readonly type = SET_GAME_TYPE;

  constructor(public payload: GameType) {
  }
}
export type GameActions = SetGameSettings | SetGameType;

import {Action} from '@ngrx/store';
import {GameLapse, IGameSettings} from './game-reducers';
import {GameType} from '../models/game-type.enum';

export const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';
export const SET_GAME_TYPE = 'SET_GAME_TYPE';
export const GET_GAME_ROUND_OBJ = 'GET_GAME_ROUND_OBJ';
export const SET_GAME_ROUND_OBJ = 'SET_GAME_ROUND_OBJ';

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

export class GetGameRoundObj implements Action {
  readonly type = GET_GAME_ROUND_OBJ;
}

export class SetGameRoundObj implements Action {
  readonly type = SET_GAME_ROUND_OBJ;

  constructor(public payload: Array<GameLapse>) {
  }
}

export type GameActions = SetGameSettings | SetGameType | GetGameRoundObj | SetGameRoundObj;

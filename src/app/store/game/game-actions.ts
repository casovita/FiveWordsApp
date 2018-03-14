import {Action} from '@ngrx/store';
import {IGameSettings} from './game-reducers';
import {GameType} from './models/game-type.enum';
import {Answer} from '../../models/answer';

export const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';

export class SetGameSettings implements Action {
  readonly type = SET_GAME_SETTINGS;

  constructor(public payload: IGameSettings) {
  }
}

export const SET_GAME_TYPE = 'SET_GAME_TYPE';

export class SetGameType implements Action {
  readonly type = SET_GAME_TYPE;

  constructor(public payload: GameType) {
  }
}

export const GET_GAME_ROUND_WORD_MATCHING = 'GET_GAME_ROUND_WORD_MATCHING';

export class GetGameRoundWordMatching implements Action {
  readonly type = GET_GAME_ROUND_WORD_MATCHING;
}

export const GET_GAME_ROUND_ONE_OF_FIVE = 'GET_GAME_ROUND_ONE_OF_FIVE';

export class GetGameRoundOneOfFive implements Action {
  readonly type = GET_GAME_ROUND_ONE_OF_FIVE;
}

export const SET_GAME_ROUND_WORD_MATCHING = 'SET_GAME_ROUND_WORD_MATCHING';

export class SetGameRoundWordMatching implements Action {
  readonly type = SET_GAME_ROUND_WORD_MATCHING;

  constructor(public payload: Array<Answer>) {
  }
}

export const SET_GAME_ROUND_ONE_OF_FIVE = 'SET_GAME_ROUND_ONE_OF_FIVE';

export class SetGameRoundOneOfFive implements Action {
  readonly type = SET_GAME_ROUND_ONE_OF_FIVE;

  constructor(public payload: Array<Answer>) {
  }
}

export const CHECK_ANSWER_ONE_OF_FIVE = 'CHECK_ANSWER_ONE_OF_FIVE';

export class CheckAnswerOneOfFive implements Action {
  readonly type = CHECK_ANSWER_ONE_OF_FIVE;

}

export const CHECK_ANSWER_WORD_MATCHING = 'CHECK_ANSWER_WORD_MATCHING';

export class CheckAnswerWordMatching implements Action {
  readonly type = CHECK_ANSWER_WORD_MATCHING;

}

export const SELECT_WM_ROOT = 'SELECT_WM_ROOT';

export class SelectWmRoot implements Action {
  readonly type = SELECT_WM_ROOT;

  constructor(public payload: string) {
  }
}

export const SELECT_OOF_ROOT = 'SELECT_OOF_ROOT';

export class SelectOofRoot implements Action {
  readonly type = SELECT_OOF_ROOT;

  constructor(public payload: string) {
  }
}

export const SELECT_WM_TARGET = 'SELECT_WM_TARGET';

export class SelectWmTarget implements Action {
  readonly type = SELECT_WM_TARGET;

  constructor(public payload: string) {
  }
}

export const SELECT_OOF_TARGET = 'SELECT_OOF_TARGET';

export class SelectOopTarget implements Action {
  readonly type = SELECT_OOF_TARGET;

  constructor(public payload: string) {
  }
}

export const SET_WM_ANSWER_TO_NULL = 'SET_WM_ANSWER_TO_NULL';

export class SetWmAnswerToNull implements Action {
  readonly type = SET_WM_ANSWER_TO_NULL;

}

export const SET_OOF_ANSWER_TO_NULL = 'SET_OOF_ANSWER_TO_NULL';

export class SetOofAnswerToNull implements Action {
  readonly type = SET_OOF_ANSWER_TO_NULL;

}

export type GameActions =
  SetGameSettings |
  SetGameType |
  GetGameRoundOneOfFive |
  GetGameRoundWordMatching |
  SetGameRoundOneOfFive |
  SetGameRoundWordMatching |
  CheckAnswerOneOfFive |
  CheckAnswerWordMatching |
  SelectWmRoot |
  SelectOofRoot |
  SelectWmTarget |
  SelectOopTarget |
  SetWmAnswerToNull |
  SetOofAnswerToNull;

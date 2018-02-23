import * as GameActions from './game-actions';
import {Language} from './models/language.enum';
import {GameType} from './models/game-type.enum';
import {GameTopic} from './models/game-topic.enum';
import {Answer} from '../../models/answer';

export interface IGameSettings {
  RootLanguage: Language;
  TargetLanguage: Language;
  Topic: GameTopic;

}

export interface State {
  GameSettings: IGameSettings
  GameType: GameType;
  GameRound?: Array<Answer>;
}

export const initialState: State = {
  GameSettings: {
    Topic: GameTopic.random,
    RootLanguage: Language.ru,
    TargetLanguage: Language.en,
  },
  GameType: GameType.WordsMatching,
  GameRound: []
};

export function gameReducer(state: State = initialState, action: GameActions.GameActions) {
  switch (action.type) {
    case GameActions.SET_GAME_SETTINGS:
      return {
        ...state,
        GameSettings: action.payload
      };
    case GameActions.SET_GAME_TYPE:
      return {
        ...state,
        GameType: action.payload
      };
    case GameActions.SET_GAME_ROUND_OBJ:
      return {
        ...state,
        GameRound: action.payload
      };
    default:
      return state;
  }
}

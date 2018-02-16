import * as GameActions from './game-actions';

export enum GameType {
  WordsMatching,
  OneOfFive
}

export enum GameTopic {
  Random, Home, Art, Weather, Business, Clothing, Buildings, Sport, Furniture, Kitchen, Vegetables
}

export interface IGameSettings {
  RootLanguage: string;
  TargetLanguage: string;
  Topic: GameTopic;

}

export interface State {
  GameSettings: IGameSettings
  GameType: GameType;
}

export const initialState: State = {
  GameSettings: {
    Topic: GameTopic.Random,
    RootLanguage: 'ru',
    TargetLanguage: 'eng',
  },
  GameType: GameType.WordsMatching

};

export function gameReducer(state: State = initialState, action: GameActions.GameActions) {
  switch (action.type) {
    case GameActions.SET_GAME_SETTINGS:
      return {
        ...state,
        GameSettings: action.payload
      };
    default:
      return state;
  }
}

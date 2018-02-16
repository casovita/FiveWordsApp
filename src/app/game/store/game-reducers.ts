import * as GameActions from './game-actions';

export enum GameType {
  WordsMatching,
  OneOfFive
}

export enum GameTopic {
  Random, Home, Art, Weather, Business, Clothing, Buildings, Sport, Furniture, Kitchen, Vegetables
}

export interface State {
  RootLanguage: string;
  TargetLanguage: string;
  Topic: GameTopic;
  GameType: GameType;
}

const initialState: State = {
  RootLanguage: 'ru',
  TargetLanguage: 'eng',
  GameType: GameType.WordsMatching,
  Topic:GameTopic.Random
}

export function gameReducer(state:State = initialState,action:GameActions.GameActions) {
switch (action.type){
  case GameActions.SET_ROOT_LANGUAGE:
    return{
      ...state,
      RootLanguage: action.payload
    };
  default:
    return state;
}
}

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

export interface ICurrentAnswer {
  WordMatching: Answer;
  OneOfFive: Answer;
}

export interface IGameRound {
  WordMatching?: Array<Answer>;
  OneOfFive?: Array<Answer>;
}

export interface State {
  GameSettings: IGameSettings
  GameType: GameType;
  GameRound: IGameRound;
  CurrentAnswer: ICurrentAnswer;
}


export const initialState: State = {
  GameSettings: {
    Topic: GameTopic.random,
    RootLanguage: Language.ru,
    TargetLanguage: Language.en,
  },
  GameType: GameType.WordsMatching,
  GameRound: {
    OneOfFive: [],
    WordMatching: [],
  },
  CurrentAnswer: {
    WordMatching: new Answer(null, null, null),
    OneOfFive: new Answer(null, null, null),
  },
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
    case GameActions.SET_GAME_ROUND_WORD_MATCHING:
      let gameRound: IGameRound = {
        WordMatching: action.payload,
        OneOfFive: state.GameRound.OneOfFive
      };
      return {
        ...state,
        GameRound: gameRound
      };
    case GameActions.SET_GAME_ROUND_ONE_OF_FIVE:
      gameRound = {
        WordMatching: state.GameRound.WordMatching,
        OneOfFive: action.payload
      };
      return {
        ...state,
        GameRound: gameRound
      };
    case GameActions.CHECK_ANSWER_WORD_MATCHING:
      let wmAnswer: Answer = state.CurrentAnswer.WordMatching;
      let isCorrectAnswer: boolean = state.GameRound.WordMatching
        .find((a) => a.root === wmAnswer.root && a.target === wmAnswer.target) != null;
      let roundArray = state.GameRound.WordMatching;

      if (isCorrectAnswer) {
        const answerIndex = roundArray.findIndex(a => a.root === wmAnswer.root && a.target === wmAnswer.target);
        roundArray[answerIndex].isResolved = true;
        wmAnswer.isResolved = true;
      } else {
        wmAnswer.isResolved = false;
      }
      gameRound = {
        WordMatching: roundArray,
        OneOfFive: state.GameRound.OneOfFive
      };
      let answer: ICurrentAnswer = {
        WordMatching: wmAnswer,
        OneOfFive: state.CurrentAnswer.OneOfFive
      };
      return {
        ...state,
        GameRound: gameRound,
        CurrentAnswer: answer
      };
    case GameActions.CHECK_ANSWER_ONE_OF_FIVE:
      let oofAnswer = state.CurrentAnswer.OneOfFive;
      isCorrectAnswer = state.GameRound.OneOfFive.find((a) => a.root === oofAnswer.root && a.target === oofAnswer.target) != null;

      oofAnswer.isResolved = isCorrectAnswer;
      answer = {
        WordMatching: state.CurrentAnswer.WordMatching,
        OneOfFive: oofAnswer
      };
      return {
        ...state,
        CurrentAnswer: answer
      };
    case GameActions.SELECT_WM_ROOT:
      wmAnswer = {
        root: action.payload,
        isResolved: state.CurrentAnswer.WordMatching.isResolved,
        target: state.CurrentAnswer.WordMatching.target
      };
      answer = {
        WordMatching: wmAnswer,
        OneOfFive: state.CurrentAnswer.OneOfFive
      };
      return {
        ...state,
        CurrentAnswer: answer
      };
    case GameActions.SELECT_OOF_ROOT:
      oofAnswer = {
        isResolved: state.CurrentAnswer.OneOfFive.isResolved,
        target: state.CurrentAnswer.OneOfFive.target,
        root: action.payload
      };
      answer = {
        WordMatching: state.CurrentAnswer.WordMatching,
        OneOfFive: oofAnswer
      };
      return {
        ...state,
        CurrentAnswer: answer
      };
    case GameActions.SELECT_WM_TARGET:
      wmAnswer = {
        target: action.payload,
        isResolved: state.CurrentAnswer.WordMatching.isResolved,
        root: state.CurrentAnswer.WordMatching.root
      };
      answer = {
        WordMatching: wmAnswer,
        OneOfFive: state.CurrentAnswer.OneOfFive
      };
      return {
        ...state,
        CurrentAnswer: answer
      };
    case GameActions.SELECT_OOF_TARGET:
      oofAnswer = {
        target: action.payload,
        isResolved: state.CurrentAnswer.OneOfFive.isResolved,
        root: state.CurrentAnswer.OneOfFive.root
      };
      answer = {
        WordMatching: state.CurrentAnswer.WordMatching,
        OneOfFive: oofAnswer
      };
      return {
        ...state,
        CurrentAnswer: answer
      };
    case GameActions.SET_WM_ANSWER_TO_NULL:
      answer = {
        WordMatching: new Answer(null, null, null),
        OneOfFive: state.CurrentAnswer.OneOfFive
      };
      return {
        ...state,
        CurrentAnswer: answer
      };
    case GameActions.SET_OOF_ANSWER_TO_NULL:
      answer = {
        WordMatching: state.CurrentAnswer.WordMatching,
        OneOfFive: new Answer(null, state.CurrentAnswer.OneOfFive.target, null)
      };
      return {
        ...state,
        CurrentAnswer: answer
      };
    default:
      return state;
  }
}

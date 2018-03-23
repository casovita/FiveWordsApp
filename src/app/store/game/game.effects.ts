import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as GameActions from './game-actions';
import * as UserActions from '../user/user.actions';
import * as fromApp from '../app.reducers'
import { GameService } from '../../services/game.service';
import { Language } from './models/language.enum';
import { Answer } from '../../models/answer';
import { IGameSettings } from './game-reducers';
import { GameType } from './models/game-type.enum';

@Injectable()
export class GameEffects {
  private currentState;

  constructor(private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private gameService: GameService) {
  }

  @Effect()
  getGameRound$: Observable<Action> = this.actions$.ofType(GameActions.GET_GAME_ROUND_WORD_MATCHING, GameActions.GET_GAME_ROUND_ONE_OF_FIVE)
    .withLatestFrom(this.store.select('GameState'))
    .switchMap(([action, state]) => {
      this.currentState = state;
      const settings: IGameSettings = state.GameSettings;
      return this.gameService.GetRoundWords(settings);
    })
    .map((array) => {
      const answersArray: Array<Answer> = array.map((obj) => {
        return new Answer(obj[Language[this.currentState.GameSettings.RootLanguage]],
          obj[Language[this.currentState.GameSettings.TargetLanguage]], false);
      });

      if (this.currentState.GameType == GameType.WordsMatching) {
        return {
          type: GameActions.SET_GAME_ROUND_WORD_MATCHING,
          payload: answersArray
        }
      } else {
        return {
          type: GameActions.SET_GAME_ROUND_ONE_OF_FIVE,
          payload: answersArray
        }
      }
    });

  ////////////////////////////////////////////////////////////////////////////

  @Effect()
  checkAnswer$ = this.actions$.ofType(GameActions.CHECK_ANSWER_WORD_MATCHING, GameActions.CHECK_ANSWER_ONE_OF_FIVE)
    .withLatestFrom(this.store.select(a => this.currentState = a.GameState))
    .switchMap(([action, state]) => {
      let answer: Answer;
      if (action.type == GameActions.CHECK_ANSWER_WORD_MATCHING) {
        answer = state.CurrentAnswer.WordMatching
      } else {
        answer = state.CurrentAnswer.OneOfFive
      }

      const gameType: GameType = state.GameType;
      switch (gameType) {
        case GameType.WordsMatching:
          if (answer.isResolved) {
            const isLastHand = state.GameRound.WordMatching.filter(a => a.isResolved == false).length == 0;
            if (isLastHand) {
              return [{
                type: UserActions.UPDATE_USER_POINTS,
                payload: 2
              }, {
                type: GameActions.SET_WM_ANSWER_TO_NULL
              }, {
                type: GameActions.GET_GAME_ROUND_WORD_MATCHING
              }];
            } else {
              return [{
                type: UserActions.UPDATE_USER_POINTS,
                payload: 2
              }, {
                type: GameActions.SET_WM_ANSWER_TO_NULL
              }];
            }
          } else {
            if (state.GameType == GameType.WordsMatching) {
              return [{
                type: UserActions.UPDATE_USER_POINTS,
                payload: -2
              }, {
                type: GameActions.SET_WM_ANSWER_TO_NULL
              }]
            } else {
              return [{
                type: UserActions.UPDATE_USER_POINTS,
                payload: -2
              }]
            }
          }
        case GameType.OneOfFive:
          if (answer.isResolved) {
            return [{
              type: GameActions.SET_OOF_ANSWER_TO_NULL
            }, {
              type: GameActions.GET_GAME_ROUND_ONE_OF_FIVE
            }, {
              type: UserActions.UPDATE_USER_POINTS,
              payload: 2
            }]
          } else {
            return [{
              type: GameActions.SET_OOF_ANSWER_TO_NULL
            }, {
              type: UserActions.UPDATE_USER_POINTS,
              payload: -2
            }]
          }
      }
    });

  @Effect()
  setGameType = this.actions$.ofType(GameActions.SET_GAME_TYPE)
    .mergeMap((action: GameActions.SetGameType) => {
      let gameType: GameType = action.payload;
      switch (gameType) {
        case GameType.WordsMatching: {
          return [{
            type: GameActions.GET_GAME_ROUND_WORD_MATCHING
          },
          {
            type: GameActions.SET_WM_ANSWER_TO_NULL
          }]
        }
        case GameType.OneOfFive: {
          return [{
            type: GameActions.GET_GAME_ROUND_ONE_OF_FIVE
          },
          {
            type: GameActions.SET_OOF_ANSWER_TO_NULL
          }]
        }
      }
    });
}

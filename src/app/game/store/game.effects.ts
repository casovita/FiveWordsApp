import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as GameActions from './game-actions';
import * as fromApp from '../../store/app.reducers'
import {GameService} from '../../services/game.service';
import {GameLapse} from './game-reducers';
import {Language} from '../models/language.enum';

@Injectable()
export class GameEffects {
  private currentState;

  constructor(private actions$: Actions, private store: Store<fromApp.AppState>, private gameService: GameService) {
  }

  @Effect()
  getRound$: Observable<Action> = this.actions$.ofType(GameActions.GET_GAME_ROUND_OBJ)
    .withLatestFrom(this.store.select('GameState'))
    .switchMap(([action, state]) => {
      this.currentState = state;
      const settings = state.GameSettings;
      return this.gameService.GetRoundWords(settings);
    })
    .map((array) => {
      console.log(this.currentState);
      const tupleArray: Array<GameLapse> = array.map((obj) => {
        let newTuple: GameLapse = [obj[Language[this.currentState.GameSettings.RootLanguage]],
          obj[Language[this.currentState.GameSettings.TargetLanguage]]];
        return newTuple;
      });

      return {
        type: GameActions.SET_GAME_ROUND_OBJ,
        payload: tupleArray
      }
    });

}

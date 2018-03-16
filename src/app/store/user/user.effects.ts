import {Injectable} from '@angular/core';
import * as fromApp from '../app.reducers';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import * as UserActions from '../user/user.actions';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private store: Store<fromApp.AppState>) {
  }

  @Effect()
  updatePoints$: Observable<Action> = this.actions$.ofType(UserActions.UPDATE_USER_POINTS)
    .map((action: UserActions.UpdateUserPoints) => {
      if (action.payload > 0) {
        return {
          type: UserActions.UPDATE_CORRECT_SEQUENCE
        }
      } else {
        return {
          type: UserActions.UPDATE_FAILS_SEQUENCE
        }
      }
    });
}

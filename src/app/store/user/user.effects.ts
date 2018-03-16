import {Injectable} from '@angular/core';
import * as fromApp from '../app.reducers';
import {Store} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import * as UserActions from '../user/user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private store: Store<fromApp.AppState>) {
  }

  @Effect()
  updatePoints$ = this.actions$.ofType(UserActions.UPDATE_USER_POINTS)
    .switchMap((action: UserActions.UpdateUserPoints) => {
      if (action.payload > 0) {
        return [{
          type: UserActions.UPDATE_CORRECT_SEQUENCE
        }, {
          type: UserActions.UPDATE_CORRECT_COUNT
        }]
      } else {
        return [{
          type: UserActions.UPDATE_FAILS_SEQUENCE
        }, {
          type: UserActions.UPDATE_FAILS_COUNT
        }]
      }
    });
}

import {Action} from '@ngrx/store';

export const UPDATE_USER_POINTS = 'UPDATE_USER_POINTS';

export class UpdateUserPoints implements Action {
  readonly type = UPDATE_USER_POINTS;

  constructor(public payload: number) {
  }
}

export type UserActions = UpdateUserPoints;

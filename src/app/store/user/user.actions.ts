import {Action} from '@ngrx/store';

export const UPDATE_USER_POINTS = 'UPDATE_USER_POINTS';

export class UpdateUserPoints implements Action {
  readonly type = UPDATE_USER_POINTS;

  constructor(public payload: number) {
  }
}

export const UPDATE_CORRECT_SEQUENCE = 'UPDATE_CORRECT_SEQUENCE';

export class UpdateCorrectSequence implements Action {
  readonly type = UPDATE_CORRECT_SEQUENCE;

  constructor(public payload: number) {
  }
}

export const UPDATE_FAILS_SEQUENCE = 'UPDATE_FAILS_SEQUENCE';

export class UpdateFailsSequence implements Action {
  readonly type = UPDATE_FAILS_SEQUENCE;

  constructor(public payload: number) {
  }
}

export const UPDATE_FAILS_COUNT = 'UPDATE_FAILS_COUNT';

export class UpdateFailsCount implements Action {
  readonly type = UPDATE_FAILS_COUNT;

  constructor(public payload: number) {
  }
}

export const UPDATE_CORRECT_COUNT = 'UPDATE_CORRECT_COUNT';

export class UpdateCorrectCount implements Action {
  readonly type = UPDATE_CORRECT_COUNT;

  constructor(public payload: number) {
  }
}

export type UserActions =
  UpdateUserPoints |
  UpdateCorrectSequence |
  UpdateFailsSequence |
  UpdateFailsCount |
  UpdateCorrectCount;

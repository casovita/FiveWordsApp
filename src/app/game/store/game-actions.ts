import {Action} from '@ngrx/store';

export const SET_ROOT_LANGUAGE = 'SET_ROOT_LANGUAGE';

export class SetRootLanguage implements Action {
  readonly type = SET_ROOT_LANGUAGE;

  constructor(public payload: string) {
  }
}


export type GameActions = SetRootLanguage;

import * as UserActions from './user.actions';


export interface State {
  Points: number;
}

const initialState: State = {
  Points: 0
}


export function userReducer(state: State = initialState, action: UserActions.UserActions) {
  switch (action.type) {
    case      UserActions.UPDATE_USER_POINTS:
      const updatedPoints = state.Points + action.payload;
      return {
        ...state,
        Points: updatedPoints
      };
    default:
      return state
  }
}

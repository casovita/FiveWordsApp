import * as UserActions from './user.actions';


export interface State {
  Points: number;
  CorrectSequence: number;
  FailsSequence: number;
}

const initialState: State = {
  Points: 0,
  CorrectSequence: 0,
  FailsSequence: 0,
};


export function userReducer(state: State = initialState, action: UserActions.UserActions) {
  switch (action.type) {
    case      UserActions.UPDATE_USER_POINTS:
      const updatedPoints = state.Points + action.payload;
      return {
        ...state,
        Points: updatedPoints
      };
    case UserActions.UPDATE_CORRECT_SEQUENCE:
      let achievement = state.CorrectSequence + 1;
      let bonus: number = 0;
      switch (achievement) {
        case 5:
          bonus = 3;
          break;
        case 15:
          bonus = 5;
          break;
        default:
          bonus = 0;
          break;
      }

      return {
        ...state,
        Points: state.Points + bonus,
        FailsSequence: 0,
        CorrectSequence: achievement
      };
    case UserActions.UPDATE_FAILS_SEQUENCE:
      achievement = state.FailsSequence + 1;
      bonus = 0;
      if (achievement == 10) {
        bonus = -4;
      }
      return {
        ...state,
        Points: state.Points + bonus,
        CorrectSequence: 0,
        FailsSequence: state.FailsSequence + 1
      };

    default:
      return state
  }
}

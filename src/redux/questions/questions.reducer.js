import { SET_QUESTIONS } from "./questions.types";

const INITIAL_STATE = {
  questionsData: []
};

const questionsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_QUESTIONS:
      return {
        ...state,
        questionsData: action.payload
      };

    // case TOGGLE_POPOVER:
    //   return {
    //     ...state,
    //     popoverOpen: !state.popoverOpen,
    //   };

    default:
      return state;
  }
};

export default questionsReducer;

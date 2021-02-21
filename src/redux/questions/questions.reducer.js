import { SET_QUESTIONS, QUESTIONS_LOADING } from "./questions.types";

const INITIAL_STATE = {
  questionsData: [],
  loading: true
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

    case QUESTIONS_LOADING:
            return {
                ...state,
                loading: true
            }

    default:
      return state;
  }
};

export default questionsReducer;

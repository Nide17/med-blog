import { SET_QUIZES } from "./quizes.types";

const INITIAL_STATE = {
  quizesData: []
};

const quizesReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_QUIZES:
      return {
        ...state,
        quizesData: action.payload
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

export default quizesReducer;

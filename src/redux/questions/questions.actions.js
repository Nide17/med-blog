import { SET_QUESTIONS } from "./questions.types";
import questions from "./questionsData";

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.

export const setQuestions = () => {

  return {
    type: SET_QUESTIONS,
    payload: questions
  };
};

// export const toggle = () => {

//   return {
//     type: TOGGLE_POPOVER,
//   };

// };

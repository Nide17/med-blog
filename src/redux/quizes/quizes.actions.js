import { SET_QUIZES } from "./quizes.types";
import qData from "./quizesData";

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.

export const setQuizes = () => {

  return {
    type: SET_QUIZES,
    payload: qData
  };
};

// export const toggle = () => {

//   return {
//     type: TOGGLE_POPOVER,
//   };

// };

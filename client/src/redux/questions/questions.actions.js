import { SET_QUESTIONS, QUESTIONS_LOADING } from "./questions.types";
import axios from 'axios';

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.

// export const setQuestions = () => {

//   return {
//     type: SET_QUESTIONS,
//     payload: questions
//   };
// };

export const setQuestions = () => dispatch => {
  dispatch(setQuestionsLoading());
  axios
      .get('/api/questions/')
      .then(res =>
          dispatch({
              type: SET_QUESTIONS,
              payload: res.data
          })
      );
};

export const setQuestionsLoading = () => {
  //Return an action to the reducer
  return {
      //action 
      type: QUESTIONS_LOADING

  };
}

// export const toggle = () => {

//   return {
//     type: TOGGLE_POPOVER,
//   };

// };

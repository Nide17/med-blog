import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { SET_QUIZES, CREATE_QUIZ, CREATE_QUIZ_FAIL, DELETE_QUIZ, DELETE_QUIZ_FAIL, UPDATE_QUIZ, UPDATE_QUIZ_FAIL } from "./quizes.types";
import { tokenConfig } from '../auth/auth.actions'

// View all quizes
export const setQuizes = () => async (dispatch, getState) => {
  // dispatch(setQuestionsLoading());

  try {
    await axios
      .get('/api/quizes', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: SET_QUIZES,
          payload: res.data,
        }),
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Create Quiz
export const createQuiz = (newQuiz) => async (dispatch, getState) => {

  try {
    await axios
      .post('/api/quizes', newQuiz, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_QUIZ,
          payload: res.data
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_QUIZ_FAIL'));
    dispatch({ type: CREATE_QUIZ_FAIL })
  }
};


// Update a Quiz
export const updateQuiz = updatedQuiz => async (dispatch, getState) => {

  try {
    await axios
      .put(`/api/quizes/${updatedQuiz.qId}`, updatedQuiz, tokenConfig(getState))
    dispatch({
      type: UPDATE_QUIZ,
      payload: updatedQuiz
    })

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_QUIZ_FAIL'));
    dispatch({ type: UPDATE_QUIZ_FAIL })
  }
}

// Delete a Quiz
export const deleteQuiz = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This Quiz will be deleted permanently!")) {
      await axios.delete(`/api/quizes/${id}`, tokenConfig(getState))
      dispatch({
        type: DELETE_QUIZ,
        payload: id
      })
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_QUIZ_FAIL'));
    dispatch({ type: DELETE_QUIZ_FAIL })
  }
}

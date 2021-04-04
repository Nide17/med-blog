import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { SET_QUIZES, CREATE_QUIZ, CREATE_QUIZ_FAIL, DELETE_QUIZ, DELETE_QUIZ_FAIL,UPDATE_QUIZ, UPDATE_QUIZ_FAIL } from "./quizes.types";
import { tokenConfig } from '../auth/auth.actions'

// View all quizes
export const setQuizes = () => (dispatch, getState) => {
  // dispatch(setQuestionsLoading());
  axios
    .get('/api/quizes', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: SET_QUIZES,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Create Quiz
export const createQuiz = (newQuiz) => async (dispatch) => {

  try {
    await axios
      .post('/api/quizes', newQuiz)
      .then(res =>
        dispatch({
          type: CREATE_QUIZ,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'CREATE_QUIZ_FAIL')
        );
        dispatch({
          type: CREATE_QUIZ_FAIL
        });
      });

  } catch (error) {
    dispatch({
      type: CREATE_QUIZ_FAIL
    })
  }
};


// Update a Quiz
export const updateQuiz = updatedCatg => async dispatch => {

  try {

      await axios
      .put(`/api/quizes/${updatedCatg.idToUpdate}`, updatedCatg)
      dispatch({
        type: UPDATE_QUIZ,
        payload: updatedCatg
      })

  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, 'UPDATE_QUIZ_FAIL')
    );

    dispatch({
      type: UPDATE_QUIZ_FAIL
    });
  }
}

// Delete a Quiz
export const deleteQuiz = id => async dispatch => {

  try {

    if (window.confirm("This Quiz will be deleted permanently!")) {
      await axios.delete(`/api/quizes/${id}`)
      dispatch({
        type: DELETE_QUIZ,
        payload: id
      })
    }

  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, 'DELETE_QUIZ_FAIL')
    );

    dispatch({
      type: DELETE_QUIZ_FAIL
    });
  }
}

import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { GET_SCORES, CREATE_SCORE, CREATE_SCORE_FAIL, DELETE_SCORE, DELETE_SCORE_FAIL, UPDATE_SCORE, UPDATE_SCORE_FAIL } from "./scores.types";
import { tokenConfig } from '../auth/auth.actions'

// View all scores
export const setScores = () => async (dispatch, getState) => {

  try {
    await axios
      .get('/api/scores', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_SCORES,
          payload: res.data,
        }),
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Create Score
export const createScore = (newScore) => async (dispatch, getState) => {

  try {
    await axios
      .post('/api/scores', newScore, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_SCORE,
          payload: res.data
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_SCORE_FAIL'));
    dispatch({ type: CREATE_SCORE_FAIL })
  }
};


// Update a Score
export const updateScore = updatedScore => async (dispatch, getState) => {

  try {
    await axios
      .put(`/api/scores/${updatedScore.sId}`, updatedScore, tokenConfig(getState))
    dispatch({
      type: UPDATE_SCORE,
      payload: updatedScore
    })

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_SCORE_FAIL'));
    dispatch({ type: UPDATE_SCORE_FAIL })
  }
}

// Delete a Score
export const deleteScore = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This Score will be deleted permanently!")) {
      await axios.delete(`/api/scores/${id}`, tokenConfig(getState))
      dispatch({
        type: DELETE_SCORE,
        payload: id
      })
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_SCORE_FAIL'));
    dispatch({ type: DELETE_SCORE_FAIL })
  }
}

import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { GET_REVIEWS, CREATE_REVIEW, CREATE_REVIEW_FAIL, DELETE_REVIEW, DELETE_REVIEW_FAIL, UPDATE_REVIEW, UPDATE_REVIEW_FAIL, REVIEWS_LOADING } from "./reviews.types";
import { tokenConfig } from '../auth/auth.actions'

// View all reviews
export const setReviews = () => async (dispatch, getState) => {
  await dispatch(setReviewsLoading());

  try {
    await axios
      .get('/api/reviews', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_REVIEWS,
          payload: res.data,
        }),
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Create Review
export const createReview = (newReview) => async (dispatch, getState) => {

  try {
    await axios
      .post('/api/reviews', newReview, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_REVIEW,
          payload: res.data
        }))
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_REVIEW_FAIL'));
    dispatch({ type: CREATE_REVIEW_FAIL })
  }
};


// Update a Review
export const updateReview = updatedReview => async (dispatch, getState) => {

  try {
    await axios
      .put(`/api/reviews/${updatedReview.rId}`, updatedReview, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: UPDATE_REVIEW,
          payload: updatedReview
        }),
        alert('Updated Successfully!'))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_REVIEW_FAIL'));
    dispatch({ type: UPDATE_REVIEW_FAIL })
  }
}

// Delete a Review
export const deleteReview = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This Review will be deleted permanently!")) {
      await axios
        .delete(`/api/reviews/${id}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_REVIEW,
            payload: id
          }),
          alert('Deleted Successfully!'))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_REVIEW_FAIL'));
    dispatch({ type: DELETE_REVIEW_FAIL })
  }
}

export const setReviewsLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: REVIEWS_LOADING

  };
}

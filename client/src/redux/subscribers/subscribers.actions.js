import { SET_POSTS, SUBSCRIBETONEWSLETTER, SET_SUBSCRIBERS, SUBSCRIBE_FAIL, DELETE_SUBSCRIBER, DELETE_SUBSCRIBER_FAIL } from "./subscribers.types";
import { GET_ERRORS } from "../error/error.types";
import axios from 'axios';

import { tokenConfig } from '../auth/auth.actions'
import { returnErrors } from "../error/error.actions";
import pData from "./postsData";

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.

export const setPosts = () => {

  return {
    type: SET_POSTS,
    payload: pData
  };
};

export const setSubscribers = () => (dispatch, getState) => {
  // dispatch(setQuestionsLoading());
  axios
    .get('/api/subscribers', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: SET_SUBSCRIBERS,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const subscribeToNewsLetter = (subscribedUser) => async (dispatch) => {

  try {
    await axios
      .post('/api/subscribers', subscribedUser)
      .then(res =>
        dispatch({
          type: SUBSCRIBETONEWSLETTER,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'SUBSCRIBE_FAIL')
        );
        dispatch({
          type: SUBSCRIBE_FAIL
        });
      });

  } catch (error) {
    dispatch({
      type: GET_ERRORS
    })
  }
};


// Delete a Subscriber
export const deleteSubscriber = id => async dispatch => {

  try {

    if (window.confirm("This Subscriber will be deleted permanently!")) {
      await axios.delete(`/api/subscribers/${id}`)
      dispatch({
        type: DELETE_SUBSCRIBER,
        payload: id
      })
    }

  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, 'DELETE_SUBSCRIBER_FAIL')
    );

    dispatch({
      type: DELETE_SUBSCRIBER_FAIL
    });
  }
}

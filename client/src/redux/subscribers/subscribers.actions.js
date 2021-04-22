import { SET_POSTS, SUBSCRIBETONEWSLETTER, SET_SUBSCRIBERS, SUBSCRIBE_FAIL, DELETE_SUBSCRIBER, DELETE_SUBSCRIBER_FAIL, SUBSCRIBERS_LOADING } from "./subscribers.types";
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

export const setSubscribers = () => async (dispatch, getState) => {
  await dispatch(setSubscribersLoading());

  try {
    await axios
      .get('/api/subscribers', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: SET_SUBSCRIBERS,
          payload: res.data,
        }),
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status))
  }
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
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'SUBSCRIBE_FAIL'));
    dispatch({ type: SUBSCRIBE_FAIL })
  }
};

// Delete a Subscriber
export const deleteSubscriber = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This Subscriber will be deleted permanently!")) {
      await axios.delete(`/api/subscribers/${id}`, tokenConfig(getState))
      dispatch({
        type: DELETE_SUBSCRIBER,
        payload: id
      })
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_SUBSCRIBER_FAIL'));
    dispatch({ type: DELETE_SUBSCRIBER_FAIL })
  }
}

export const setSubscribersLoading = () => {
  //Return an action to the reducer
  return {
      //action 
      type: SUBSCRIBERS_LOADING

  };
}

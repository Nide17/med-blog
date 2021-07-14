import { CREATE_RESOURCE, CREATE_RESOURCE_FAIL, GET_RESOURCES, GET_RESOURCES_FAIL, DELETE_RESOURCE, DELETE_RESOURCE_FAIL, RESOURCES_LOADING } from "./resources.types";
import axios from 'axios';

import { tokenConfig } from '../auth/auth.actions'
import { returnErrors } from "../error/error.actions";

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.

export const getResources = () => async (dispatch, getState) => {
  await dispatch(getResourcesLoading());

  try {
    await axios
      .get('/api/resources', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_RESOURCES,
          payload: res.data,
        }),
      )
  } catch(err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_RESOURCES_FAIL'));
    dispatch({ type: GET_RESOURCES_FAIL })
  }
};

export const createResource = (newResource) => async (dispatch) => {

  try {
    await axios
      .post('/api/resources', newResource)
      .then(res =>
        dispatch({
          type: CREATE_RESOURCE,
          payload: res.data
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_RESOURCE_FAIL'));
    dispatch({ type: CREATE_RESOURCE_FAIL })
  }
};

// Delete a Resource
export const deleteResource = resourceId => async (dispatch, getState) => {

  try {
    if (window.confirm("You are deleting this resource!")) {
      await axios
        .delete(`/api/resources/${resourceId}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_RESOURCE,
            payload: resourceId
          }))
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_RESOURCE_FAIL'));
    dispatch({ type: DELETE_RESOURCE_FAIL })
  }
}

export const getResourcesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: RESOURCES_LOADING

  };
}

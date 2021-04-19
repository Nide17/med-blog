import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, ADD_CONTACT_FAIL, DELETE_CONTACT_FAIL } from "./contacts.types";
import axios from 'axios';

import { tokenConfig } from '../auth/auth.actions'
import { returnErrors } from "../error/error.actions";

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.
export const getContacts = () => async (dispatch, getState) => {

  try {
    await axios
      .get('/api/contacts', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_CONTACTS,
          payload: res.data,
        }),
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status))
  }
};

export const sendMsg = (contactMsg) => async (dispatch) => {

  try {
    await axios
      .post('/api/contacts', contactMsg)
      .then(res =>
        dispatch({
          type: ADD_CONTACT,
          payload: res.data
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'ADD_CONTACT_FAIL'));
    dispatch({ type: ADD_CONTACT_FAIL })
  }
};


// Delete a Contact
export const deleteContact = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This Contact will be deleted permanently!")) {
      await axios.delete(`/api/contacts/${id}`, tokenConfig(getState))
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      })
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_CONTACT_FAIL'));
    dispatch({ type: DELETE_CONTACT_FAIL })
  }
}

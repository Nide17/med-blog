import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "./auth.types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))

    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    });
    console.log(getState());

}

// Register User
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios.post('/api/auth/register', body, config)

    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))

    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL
      });
    });
}

// Login User
export const login = ({ email, password }) =>
  dispatch => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios
      .post('/api/auth/login', body, config)
      .then(res =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
          type: LOGIN_FAIL
        });
      });
  };


// Logout USER
export const logout = (history) => async dispatch => {
  dispatch({
      type: LOGOUT_SUCCESS
  })
}

//HELPER FUNCTION TO GET THE TOKEN - SETUP CONFIG/headers and token
export const tokenConfig = getState => {

  // Get token from localStorage
  const token = getState().authReducer.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // If token, add to header
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config
}

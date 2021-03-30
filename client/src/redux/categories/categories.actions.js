import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { SET_CATEGORIES, CREATE_CATEGORY, CREATE_CATEGORY_FAIL } from "./categories.types";
import { tokenConfig } from '../auth/auth.actions'

// View all categories
export const setCategories = () => (dispatch, getState) => {
  // dispatch(setQuestionsLoading());
  axios
    .get('/api/categories', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: SET_CATEGORIES,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Create category
export const createCategory = (newCategory) => async (dispatch) => {

  try {
    await axios
      .post('/api/categories', newCategory)
      .then(res =>
        dispatch({
          type: CREATE_CATEGORY,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'CREATE_CATEGORY_FAIL')
        );
        dispatch({
          type: CREATE_CATEGORY_FAIL
        });
      });

  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL
    })
  }
};
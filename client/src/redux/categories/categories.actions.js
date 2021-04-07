import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { SET_CATEGORIES, SET_CATEGORIES_FAIL, CREATE_CATEGORY, CREATE_CATEGORY_FAIL, DELETE_CATEGORY, DELETE_CATEGORY_FAIL, UPDATE_CATEGORY, UPDATE_CATEGORY_FAIL } from "./categories.types";
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
      }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'SET_CATEGORIES_FAIL'));
      dispatch({ type: SET_CATEGORIES_FAIL })
    });
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
        }))
      // .then(
      //   // Reload the page after category addition
      //   window.location.reload())

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_CATEGORY_FAIL'));
    dispatch({ type: CREATE_CATEGORY_FAIL })
  }
};


// Update a category
export const updateCategory = updatedCatg => async dispatch => {

  try {
    await axios
      .put(`/api/categories/${updatedCatg.idToUpdate}`, updatedCatg)
      .then(() =>
        dispatch({
          type: UPDATE_CATEGORY,
          payload: updatedCatg
        }))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_CATEGORY_FAIL'));
    dispatch({ type: UPDATE_CATEGORY_FAIL });
  }
}


// Delete a category
export const deleteCategory = id => async dispatch => {

  try {
    if (window.confirm("This category will be deleted permanently!")) {
      await axios.delete(`/api/categories/${id}`)
        .then(() =>
          dispatch({
            type: DELETE_CATEGORY,
            payload: id
          }))
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_CATEGORY_FAIL'));
    dispatch({ type: DELETE_CATEGORY_FAIL });
  }
}

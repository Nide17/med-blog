import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { SET_CATEGORIES, CREATE_CATEGORY, CREATE_CATEGORY_FAIL, DELETE_CATEGORY, DELETE_CATEGORY_FAIL,UPDATE_CATEGORY, UPDATE_CATEGORY_FAIL } from "./categories.types";
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

// Delete a category
export const deleteCategory = id => async dispatch => {

  try {

    if (window.confirm("This category will be deleted permanently!")) {
      await axios.delete(`/api/categories/${id}`)
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      })
    }

  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, 'DELETE_CATEGORY_FAIL')
    );

    dispatch({
      type: DELETE_CATEGORY_FAIL
    });
  }
}

// Update a category
export const updateCategory = updatedCatg => async dispatch => {

  try {

    if (window.confirm("Update this?")) {
      await axios.update(`/api/categories/${updatedCatg.id}`)
      dispatch({
        type: UPDATE_CATEGORY,
        payload: updatedCatg
      })
    }

  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, 'UPDATE_CATEGORY_FAIL')
    );

    dispatch({
      type: UPDATE_CATEGORY_FAIL
    });
  }
}
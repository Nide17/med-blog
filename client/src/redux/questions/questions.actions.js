import { SET_QUESTIONS, QUESTIONS_LOADING, ADD_QUESTION, DELETE_QUESTION, GET_ERRORS } from "./questions.types";
import axios from 'axios';
import { tokenConfig } from '../auth/auth.actions'
import { returnErrors } from "../error/error.actions";

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.
export const setQuestions = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios
        .get('/api/questions')
        .then(res =>
            dispatch({
                type: SET_QUESTIONS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//instead of id it takes the whole question
export const addQuestion = (question, history) => async (dispatch, getState) => {

    try {
        await axios
            .post('/api/questions', question, tokenConfig(getState))
            .then(res =>
                dispatch({
                    type: ADD_QUESTION,
                    payload: res.data
                }),
                alert('Added Successfully!')
            )

            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status))
            );

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            // payload: error.response.data
        })
    }
};

export const deleteQuestion = (id) => async (dispatch, getState) => {

    try {
        await axios
            .delete(`/api/questions/${id}`, tokenConfig(getState))
            .then(res =>
                dispatch({
                    type: DELETE_QUESTION,
                    payload: id
                }),
                alert('Added Successfully!')
            )

            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status))
            );

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            // payload: error.response.data
        })
    }
};



export const setQuestionsLoading = () => {
    //Return an action to the reducer
    return {
        //action 
        type: QUESTIONS_LOADING

    };
}

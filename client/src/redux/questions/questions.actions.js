import { SET_QUESTIONS, QUESTIONS_LOADING, ADD_QUESTION, GET_ERRORS } from "./questions.types";
import axios from 'axios';

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.
export const setQuestions = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios
        .get('/api/questions/')
        .then(res =>
            dispatch({
                type: SET_QUESTIONS,
                payload: res.data
            })
        );
};

export const setQuestionsLoading = () => {
    //Return an action to the reducer
    return {
        //action 
        type: QUESTIONS_LOADING

    };
}

//instead of id it takes the whole question
export const addQuestion = (question, history) => async dispatch => {

    try {
        await axios
            .post('/api/questions', question)
            .then(res =>
                dispatch({
                    type: ADD_QUESTION,
                    payload: res.data
                })
            )
            .then(alert('Added Successfully!'))

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            // payload: error.response.data
        })
    }
};

import { SET_QUESTIONS, QUESTIONS_LOADING, ADD_QUESTION } from "./questions.types";

const INITIAL_STATE = {
  questionsData: [],
  loading: true
};

const questionsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_QUESTIONS:
      return {
        ...state,
        loading: false,
        questionsData: action.payload
      };
     
    case ADD_QUESTION:
        return {
            ...state,
            questionsData: [ ...state.questionsData, action.payload ]
        };

    case QUESTIONS_LOADING:
            return {
                ...state,
                loading: true
            }

    default:
      return state;
  }
};

export default questionsReducer;

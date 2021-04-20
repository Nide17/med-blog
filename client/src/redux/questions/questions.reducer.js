import { SET_QUESTIONS, QUESTIONS_LOADING, ADD_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } from "./questions.types";

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

    case UPDATE_QUESTION:
      return {
        ...state,
        questionsData: state.questionsData.map((question) => {

          if (question._id === action.payload.qtId) {

            return {
              ...question,
              title: action.payload.title,
              description: action.payload.description,
              last_updated_by: action.payload.last_updated_by
            }

          } else return question;
        })
      }

      case DELETE_QUESTION:
        return {
          ...state,
          questionsData: state.questionsData.filter(question => question._id !== action.payload)
        }
  
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

import { SET_QUIZES, CREATE_QUIZ, CREATE_QUIZ_FAIL, DELETE_QUIZ, DELETE_QUIZ_FAIL, UPDATE_QUIZ, UPDATE_QUIZ_FAIL } from "./quizes.types";

const INITIAL_STATE = {
  allQuizes: []
};

const quizesReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_QUIZES:
      return {
        ...state,
        allQuizes: action.payload
      };

    case CREATE_QUIZ:
      return {
        ...state,
        allQuizes: [...state.allQuizes, action.payload]
      };

    case CREATE_QUIZ_FAIL:
    case DELETE_QUIZ_FAIL:
    case UPDATE_QUIZ_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

    case UPDATE_QUIZ:
      return {
        ...state,
        allQuizes: state.allQuizes.map((quiz) => {

          if (quiz._id === action.payload.qId) {

            return {
              ...quiz,
              title: action.payload.title,
              description: action.payload.description,
              last_updated_by: action.payload.last_updated_by
            }

          } else return quiz;
        })
      }

      case DELETE_QUIZ:
        return {
          ...state,
          allQuizes: state.allQuizes.filter(quiz => quiz._id !== action.payload)
        }
  

    default:
      return state;
  }
};

export default quizesReducer;

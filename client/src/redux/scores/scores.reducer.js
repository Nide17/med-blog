import { GET_SCORES, CREATE_SCORE, CREATE_SCORE_FAIL, DELETE_SCORE, DELETE_SCORE_FAIL, UPDATE_SCORE, UPDATE_SCORE_FAIL } from "./scores.types";

const INITIAL_STATE = {
  allScores: []
};

const scoresReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_SCORES:
      return {
        ...state,
        allScores: action.payload
      };

    case CREATE_SCORE:
      return {
        ...state,
        allScores: [...state.allScores, action.payload]
      };

    case CREATE_SCORE_FAIL:
    case DELETE_SCORE_FAIL:
    case UPDATE_SCORE_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

    case UPDATE_SCORE:
      return {
        ...state,
        allScores: state.allScores.map((score) => {

          if (score._id === action.payload.sId) {

            return {
              ...score,
              title: action.payload.title,
              description: action.payload.description,
              last_updated_by: action.payload.last_updated_by
            }

          } else return score;
        })
      }

      case DELETE_SCORE:
        return {
          ...state,
          allScores: state.allScores.filter(score => score._id !== action.payload)
        }
  

    default:
      return state;
  }
};

export default scoresReducer;

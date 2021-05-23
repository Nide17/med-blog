import { GET_REVIEWS, CREATE_REVIEW, CREATE_REVIEW_FAIL, DELETE_REVIEW, DELETE_REVIEW_FAIL, UPDATE_REVIEW, UPDATE_REVIEW_FAIL, REVIEWS_LOADING } from "./reviews.types";

const INITIAL_STATE = {
  allReviews: [],
  isLoading: true
};

const reviewsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_REVIEWS:
      return {
        ...state,
        isLoading: false,
        allReviews: action.payload
      };

    case CREATE_REVIEW:
      return {
        ...state,
        allReviews: [...state.allReviews, action.payload]
      };

    case CREATE_REVIEW_FAIL:
    case DELETE_REVIEW_FAIL:
    case UPDATE_REVIEW_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

    case UPDATE_REVIEW:
      return {
        ...state,
        allReviews: state.allReviews.map((review) => {

          if (review._id === action.payload.rId) {

            return {
              ...review,
              title: action.payload.title,
              description: action.payload.description
            }

          } else return review;
        })
      }

    case DELETE_REVIEW:
      return {
        ...state,
        allReviews: state.allReviews.filter(review => review._id !== action.payload)
      }

    case REVIEWS_LOADING:
      return {
        ...state,
        isLoading: true
      }

    default:
      return state;
  }
};

export default reviewsReducer;

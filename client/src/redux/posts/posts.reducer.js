import { SET_POSTS, SUBSCRIBETONEWSLETTER, SET_SUBSCRIBERS, SUBSCRIBE_FAIL } from "./posts.types";

const INITIAL_STATE = {
  postsData: [],
  subscribedUsers: []
};

const postsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_POSTS:
      return {
        ...state,
        postsData: action.payload
      };

    case SET_SUBSCRIBERS:
      return {
        ...state,
        subscribedUsers: action.payload
      };

    case SUBSCRIBETONEWSLETTER:
      return {
        ...state,
        subscribedUsers: [...state.subscribedUsers, action.payload, ({msg: "Success!"})]
      };

    case SUBSCRIBE_FAIL:
      return {
        ...state,
        subscribedUsers: null
      };

    default:
      return state;
  }
};

export default postsReducer;

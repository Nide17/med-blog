import { SET_POSTS } from "./posts.types";

const INITIAL_STATE = {
  postsData: []
};

const postsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_POSTS:
      return {
        ...state,
        postsData: action.payload
      };
      
    default:
      return state;
  }
};

export default postsReducer;

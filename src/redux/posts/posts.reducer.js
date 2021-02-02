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

    // case TOGGLE_POPOVER:
    //   return {
    //     ...state,
    //     popoverOpen: !state.popoverOpen,
    //   };

    default:
      return state;
  }
};

export default postsReducer;

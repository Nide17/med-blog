import { SET_POSTS } from "./posts.types";
import pData from "./postsData";

// dispatch(action)
// Dispatches an action. This is the only way to trigger a state change.

export const setPosts = () => {

  return {
    type: SET_POSTS,
    payload: pData
  };
};

// export const toggle = () => {

//   return {
//     type: TOGGLE_POPOVER,
//   };

// };

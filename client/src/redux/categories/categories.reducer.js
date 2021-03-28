import { SET_CATEGORIES, CREATE_CATEGORY, CREATE_CATEGORY_FAIL } from "./categories.types";

const INITIAL_STATE = {
  allcategories: []
};

const categoriesReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_CATEGORIES:
      return {
        ...state,
        allcategories: action.payload
      };

      case CREATE_CATEGORY:
        return {
            ...state,
            allcategories: [ ...state.allcategories, action.payload, ({msg: "Success!"}) ]
        };

    case CREATE_CATEGORY_FAIL:
      return {
        ...state,
        allcategories: null
      };

    default:
      return state;
  }
};

export default categoriesReducer;

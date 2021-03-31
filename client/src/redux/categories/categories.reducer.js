import { SET_CATEGORIES, CREATE_CATEGORY, CREATE_CATEGORY_FAIL, DELETE_CATEGORY, DELETE_CATEGORY_FAIL,UPDATE_CATEGORY, UPDATE_CATEGORY_FAIL } from "./categories.types";

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
    case DELETE_CATEGORY_FAIL:
    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        msg: "Failed!"
      };

      case DELETE_CATEGORY:
        return {
          ...state,
          allcategories: state.allcategories.filter(catg => catg.id !== action.payload)
      }

      case UPDATE_CATEGORY:
        return state.allcategories.map((catg)=>{
          if(catg.id === action.payload.id) {
            return {
               ...catg,
               title:action.payload.title,
               description:action.payload.description
            }
          } else return catg;
        })


    default:
      return state;
  }
};

export default categoriesReducer;

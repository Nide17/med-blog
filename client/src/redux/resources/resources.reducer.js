import { CREATE_RESOURCE, CREATE_RESOURCE_FAIL, GET_RESOURCES, GET_RESOURCES_FAIL, DELETE_RESOURCE, DELETE_RESOURCE_FAIL, RESOURCES_LOADING } from "./resources.types";

const INITIAL_STATE = {
  allResources: [],
  isLoading: true
};

const resourcesReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_RESOURCES:
      return {
        ...state,
        isLoading: false,
        allResources: action.payload
      };

    case CREATE_RESOURCE:
      return {
        ...state,
        allResources: [...state.allResources, action.payload]
      };

    case CREATE_RESOURCE_FAIL:
    case GET_RESOURCES_FAIL:
    case DELETE_RESOURCE_FAIL:
      return {
        ...state,
        allResources: null
      };

    case DELETE_RESOURCE:
      return {
        ...state,
        allResources: state.allResources.filter(resource => resource._id !== action.resourceId)
      }

    case RESOURCES_LOADING:
      return {
        ...state,
        isLoading: true
      }

    default:
      return state;
  }
};

export default resourcesReducer;

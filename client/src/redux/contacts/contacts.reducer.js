import { GET_CONTACTS, GET_CONTACT, ADD_CONTACT, DELETE_CONTACT, ADD_CONTACT_FAIL, DELETE_CONTACT_FAIL, CONTACTS_LOADING } from "./contacts.types";

const INITIAL_STATE = {
  contacts: [],
  isLoading: true
};

const contactsReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_CONTACTS:
      return {
        ...state,
        isLoading: false,
        contacts: action.payload
      };

    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload
      };

    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case ADD_CONTACT_FAIL:
    case DELETE_CONTACT_FAIL:
      return {
        ...state,
        contacts: null
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== action.payload)
      }

    case CONTACTS_LOADING:
      return {
        ...state,
        isLoading: true
      }


    default:
      return state;
  }
};

export default contactsReducer;

import { combineReducers } from 'redux';

import subscribersReducer from './subscribers/subscribers.reducer';
import questionsReducer from './questions/questions.reducer';
import errorReducer from './error/error.reducer';
import authReducer from './auth/auth.reducer';
import categoriesReducer from './categories/categories.reducer';
import quizesReducer from './quizes/quizes.reducer';
import scoresReducer from './scores/scores.reducer';
import contactsReducer from './contacts/contacts.reducer';

const rootReducer = combineReducers({ subscribersReducer, questionsReducer, errorReducer, authReducer, categoriesReducer, quizesReducer, scoresReducer, contactsReducer });

export default rootReducer;
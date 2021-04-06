import { combineReducers } from 'redux';
import postsReducer from './subscribers/subscribers.reducer';
import questionsReducer from './questions/questions.reducer';
import errorReducer from './error/error.reducer';
import authReducer from './auth/auth.reducer';
import categoriesReducer from './categories/categories.reducer';
import quizesReducer from './quizes/quizes.reducer';

const rootReducer = combineReducers({ postsReducer, questionsReducer, errorReducer, authReducer, categoriesReducer, quizesReducer });

export default rootReducer;
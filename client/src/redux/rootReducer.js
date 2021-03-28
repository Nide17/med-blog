import { combineReducers } from 'redux';
import postsReducer from './posts/posts.reducer';
import questionsReducer from './questions/questions.reducer';
import errorReducer from './error/error.reducer';
import authReducer from './auth/auth.reducer';
import categoriesReducer from './categories/categories.reducer';

const rootReducer = combineReducers({ postsReducer, questionsReducer, errorReducer, authReducer, categoriesReducer });

export default rootReducer;
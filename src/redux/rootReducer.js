import { combineReducers } from 'redux';
import postsReducer from './posts/posts.reducer';
import questionsReducer from './questions/questions.reducer';

const rootReducer = combineReducers({ postsReducer, questionsReducer });

export default rootReducer;
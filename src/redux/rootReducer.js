import { combineReducers } from 'redux';
import postsReducer from './posts/posts.reducer';
import quizesReducer from './quizes/quizes.reducer';

const rootReducer = combineReducers({ postsReducer, quizesReducer });

export default rootReducer;
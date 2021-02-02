import { combineReducers } from 'redux';
import postsReducer from './posts/posts.reducer';

const rootReducer = combineReducers({ postsReducer });

export default rootReducer;
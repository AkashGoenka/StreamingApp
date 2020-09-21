import {combineReducers} from 'redux';
import {reducer} from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
	 auth:authReducer,
	 form:reducer,
	 streams:streamReducer
});
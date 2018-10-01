import * as actionTypes from './types';
import axios from 'axios';
import {setCurrentUser} from "./authActions";

//get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get('/api/profile')
		.then(res => dispatch({
			type: actionTypes.GET_PROFILE,
			payload: res.data
		}))
		// no profile
		.catch(err => dispatch({
			type: actionTypes.GET_PROFILE,
			payload: {}
		}))
}

export const createProfile = (profileData, history) => dispatch => {
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

export const addExperience = (expData, history) => dispatch => {
	axios
		.post('/api/profile/experience', expData)
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

export const deleteAccount = () => dispatch => {
	if (window.confirm("Are you sure? This cannot be undo")) {
		axios.delete('/api/profile')
			.then(res => {
				dispatch(setCurrentUser({}));
			})
			.catch(err => dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			}))
	}
}

export const setProfileLoading = () => {
	return {
		type: actionTypes.PROFILE_LOADING
	}
}

export const clearCurrentProfile = () => {
	return {
		type: actionTypes.CLEAR_CURRENT_PROFILE
	}
}

import * as actionTypes from './types';
import axios from 'axios';
import {setCurrentUser} from "./authActions";


//get all profiles
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get('/api/profile/all')
		.then(res =>
			dispatch({
				type: actionTypes.GET_PROFILES,
				payload: res.data
			}))
		.catch( err => dispatch({
			type: actionTypes.GET_PROFILES,
			payload: null
		}))

}

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

export const addEducation = (eduData, history) => dispatch => {
	axios
		.post('/api/profile/education', eduData)
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

export const addPublication = (pubData, history) => dispatch => {
	axios
		.post('/api/profile/publication', pubData)
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

export const deleteExperience = id => dispatch => {
	axios.delete(`api/profile/experience/${id}`)
		.then(res => dispatch({
			type: actionTypes.GET_PROFILE,
			payload: res.data
		}))
}

export const deleteEducation = id => dispatch => {
	axios.delete(`api/profile/education/${id}`)
		.then(res => dispatch({
			type: actionTypes.GET_PROFILE,
			payload: res.data
		}))
}

export const deletePublication = id => dispatch => {
	axios.delete(`api/profile/publication/${id}`)
		.then(res => dispatch({
			type: actionTypes.GET_PROFILE,
			payload: res.data
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

export const getProfileByHandle = handle => dispatch =>{
	dispatch(setProfileLoading());
	axios.get(`/api/profile/${handle}`)
		.then(res => dispatch({
			type: actionTypes.GET_PROFILE,
			payload: res.data
		}))
		.catch(err => dispatch({
			type: actionTypes.GET_PROFILE,
			payload: null
		}))
}

// register user
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) =>  dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/login')) // go to login page when successfully registered
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
			})
		);
}


//log in user
export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
		// save to localStorage
		const { token } = res.data;
			// set token to localStorage
			localStorage.setItem('jwtToken', token);
			// set token to Auth header
			setAuthToken(token);
		//	decode token to get user data
			const decoded = jwt_decode(token);
		//	set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
}

//set logged in user
export const setCurrentUser = decoded => ({
	type: SET_CURRENT_USER,
	payload: decoded
})

//log out user
export const logoutUser = () => dispatch => {
//remove token from localStorage
	localStorage.removeItem('jwtToken');
//	remove auth header for future requests
	setAuthToken(false);
//	set current user to {} and isAuthenticated to false
	dispatch(setCurrentUser({}));
}
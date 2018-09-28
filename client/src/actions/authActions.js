// register user
import {GET_ERRORS} from "./types";
import axios from 'axios';

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
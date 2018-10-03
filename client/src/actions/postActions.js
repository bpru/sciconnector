import * as actionTypes from './types';
import axios from 'axios';

export const addPost = postData => dispatch => {
	axios
		.post('/api/posts', postData)
		.then(res => dispatch({
			type: actionTypes.ADD_POST,
			payload: res.data
		}))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then(res => dispatch({
			type: actionTypes.GET_POSTS,
			payload: res.data
		}))
		.catch(err => dispatch({
			type: actionTypes.GET_POSTS,
			payload: null
		}))
}

export const setPostLoading = () => ({
	type: actionTypes.POST_LOADING
})
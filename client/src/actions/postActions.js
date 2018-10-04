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

export const deletePost = id => dispatch => {
	axios.delete(`api/posts/${id}`)
		.then(res => dispatch({
			type: actionTypes.DELETE_POST,
			payload: id
		}))
		.catch(err => dispatch({
			type: actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

export const addLike = id => dispatch => {
	axios.post(`/api/posts/like/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => dispatch({
			type:actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

export const removeLike = id => dispatch => {
	axios.post(`/api/posts/unlike/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => dispatch({
			type:actionTypes.GET_ERRORS,
			payload: err.response.data
		}))
}

export const setPostLoading = () => ({
	type: actionTypes.POST_LOADING
})
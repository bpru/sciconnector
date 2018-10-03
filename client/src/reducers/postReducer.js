import * as actionTypes from '../actions/types';
const initialState = {
	posts: [],
	post: {},
	loading: false
}

export default function(state=initialState, action) {
	switch (action.type) {
		case actionTypes.POST_LOADING:
			return {
				...state,
				loading: true
			}
		case actionTypes.GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			}
		case actionTypes.ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			}
		default:
			return state;
	}
}
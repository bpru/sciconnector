import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import TextAreaGroup from "../common/TextAreaGroup";
import {addComment} from "../../actions/postActions";

class CommentForm extends Component {
	state = {
		text: '',
		errors: {}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	onSubmit = e => {
		e.preventDefault();
		const {user} = this.props.auth;
		const {postId} = this.props;
		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};
		this.props.addComment(postId, newComment);
		this.setState({text: ''});

	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	render() {
		const {errors} = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						Make a comment...
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaGroup
									placeholder="Reply to post"
									name="text"
									value={this.state.text}
									onChange={this.onChange}
									error={errors.text}/>

							</div>
							<button type="submit" className="btn btn-dark">Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CommentForm.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, {addComment})(CommentForm);
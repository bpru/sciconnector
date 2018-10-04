import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPost} from "../../actions/postActions";
import Posts from "./Posts";
import Link from "react-router-dom/es/Link";
import Spinner from "../common/Spinner";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {

	componentDidMount() {

		this.props.getPost(this.props.match.params.id);
	}
	render() {
		const {loading, post} = this.props.post;
		let postContent;
		if (loading || post === null || Object.keys(post).length === 0) {
			postContent = <Spinner/>;
		} else {
			postContent = (
				<div>
					<PostItem post={post} showAction={false}/>
					<CommentForm postId={post._id}/>
					<CommentFeed postId={post._id} comments={post.comments}/>
				</div>
			)
		}
		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" component={Posts}>Go back to post feed</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	post: state.post
})

export default connect(mapStateToProps, {getPost})(Post);
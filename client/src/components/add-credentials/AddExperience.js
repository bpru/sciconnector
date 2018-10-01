import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";

class AddExperience extends Component {
	state = {
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
		errors: '',
		disabled: '',
	}
	render() {
		const {errors} = this.state;
		return (
			<div className="add-experiemce">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link className="btn btn-light" to="/dashboard">Go Back</Link>
							<h1 className="display-4 text-center">Add Experience</h1>
							<p className="lead text-center">Add any job or position that you have had in the past or current</p>
							<small className="d-block pd-3">* = required fields</small>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps)(withRouter(AddExperience));
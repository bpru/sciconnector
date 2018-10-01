import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";

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

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit = e => {
		e.preventDefault();
		console.log('submit');
	}

	onCheck = e => {
		this.setState({
			current: !this.state.current,
			disabled: !this.state.disabled
		})
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
							<form onSubmit={this.onSUbmit}>
								<TextFieldGroup
									placeholder='* Company'
									value={this.state.company}
									name='company'
									onChange={this.onChange}
									error={errors.company}/>
								<TextFieldGroup
									placeholder='Job Title'
									value={this.state.title}
									name='title'
									onChange={this.onChange}
									error={errors.title}/>
								<TextFieldGroup
									placeholder='Location'
									value={this.state.location}
									name='location'
									onChange={this.onChange}
									error={errors.location}/>
								<h6>From Date</h6>
								<TextFieldGroup
									type='date'
									value={this.state.from}
									name='from'
									onChange={this.onChange}
									error={errors.from}/>
								<h6>To Date</h6>
								<TextFieldGroup
									type='date'
									value={this.state.to}
									name='to'
									onChange={this.onChange}
									error={errors.to}
									disabled={this.state.disabled ? 'disabled': ''}/>
								<div className="form-check mb-4">
									<input
										type="checkbox"
										className="form-check-input"
										name="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
										id='current'
									/>
									<label htmlFor="current" className="form-check-label">
										Current Job
									</label>
								</div>
								<TextAreaGroup
									placeholder="Job Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us about this position"/>
								<input type="Submit" value="submit" className="btn btn-info btn-block mt-4"/>
							</form>
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
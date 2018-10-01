import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import {addEducation} from "../../actions/profileActions";

class AddEducation extends Component {
	state = {
		school: '',
		degree: '',
		major: '',
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
		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			major: this.state.major,
			from: this.state.from,
			to: this.state.to,
			description: this.state.description,
			current: this.state.current
		}

		this.props.addEducation(eduData, this.props.history);
	}

	onCheck = e => {
		this.setState({
			current: !this.state.current,
			disabled: !this.state.disabled
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	render() {
		const {errors} = this.state;
		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link className="btn btn-light" to="/dashboard">Go Back</Link>
							<h1 className="display-4 text-center">Add Experience</h1>
							<p className="lead text-center">Add any job or position that you have had in the past or current</p>
							<small className="d-block pd-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='* School'
									value={this.state.school}
									name='school'
									onChange={this.onChange}
									error={errors.school}/>
								<TextFieldGroup
									placeholder='Degree'
									value={this.state.degree}
									name='degree'
									onChange={this.onChange}
									error={errors.degree}/>
								<TextFieldGroup
									placeholder='Field of study'
									value={this.state.major}
									name='major'
									onChange={this.onChange}
									error={errors.major}/>
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

AddEducation.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addEducation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import InputGroup from "../common/InputGroup";
import {createProfile, getCurrentProfile} from "../../actions/profileActions";
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
	state = {
		displaySocialInputs: false,
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
		errors: {}
	}

	componentDidMount() {
		this.props.getCurrentProfile();

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors})
		}

		if (nextProps.profile.profile) {

			const profile = nextProps.profile.profile;
		//	change skills back to comma separate values
			const skillCSV = !isEmpty(profile.skills)? profile.skills.join(','): '';

		//	if field does not exist, put empty string
			profile.company = !isEmpty(profile.company)? profile.company: '';
			profile.website = !isEmpty(profile.website)? profile.website: '';
			profile.location = !isEmpty(profile.location)? profile.location: '';
			profile.githubusername = !isEmpty(profile.githubusername)? profile.githubusername: '';
			profile.status = !isEmpty(profile.status)? profile.status: '';
			profile.bio = !isEmpty(profile.bio)? profile.bio: '';
			// profile.social = !isEmpty(profile.social)? profile.social: {};
			profile.twitter = profile.social && !isEmpty(profile.social.twitter)? profile.social.twitter: '';
			profile.youtube = profile.social && !isEmpty(profile.social.youtube)? profile.social.youtube: '';
			profile.linkedin = profile.social && !isEmpty(profile.social.linkedin)? profile.social.linkedin: '';
			profile.facebook = profile.social && !isEmpty(profile.social.facebook)? profile.social.facebook: '';
			profile.instagram = profile.social && !isEmpty(profile.social.instagram)? profile.social.instagram: '';

			this.setState({
				handle: profile.handle,
				company: profile.company,
				location: profile.location,
				website: profile.website,
				githubusername: profile.githubusername,
				status: profile.status,
				bio: profile.bio,
				facebook: profile.facebook,
				twitter: profile.twitter,
				linkedin: profile.linkedin,
				instagram: profile.instagram,
				youtube: profile.youtube,

			})
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram,
		}
		this.props.createProfile(profileData, this.props.history);
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}
	render() {
		const {errors, displaySocialInputs} = this.state;
		let socialInputs;
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder='Twitter Profile Link'
						name='twitter'
						icon='fab fa-twitter'
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}/>
					<InputGroup
						placeholder='Facebook Profile Link'
						name='facebook'
						icon='fab fa-facebook'
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}/>
					<InputGroup
						placeholder='Linkedin Profile Link'
						name='linkedin'
						icon='fab fa-linkedin'
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}/>
					<InputGroup
						placeholder='Youtube Channel Link'
						name='youtube'
						icon='fab fa-youtube'
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}/>
					<InputGroup
						placeholder='Instagram Page Link'
						name='instagram'
						icon='fab fa-instagram'
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}/>
				</div>
			)
		}
		const options = [
			{ label: '* Select Professional Status', value: 0},
			{ label: 'Developer', value: 'Developer'},
			{ label: 'Junior Developer', value: 'Junior Developer'},
			{ label: 'Senior Developer', value: 'Senior Developer'},
			{ label: 'Manager', value: 'Manager'},
			{ label: 'Student or Learning', value: 'Student or Learning'},
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
			{ label: 'Intern', value: 'Intern'},
			{ label: 'Other', value: 'Other'}
		]
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Edit Profile</h1>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname, etc
									(This CAN'T be changed later"/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									error={errors.status}
									options={options}
									info="Give us an idea of where you are at in your career"/>
								<TextFieldGroup
									placeholder='Company'
									name='company'
									value={this.state.company}
									error={errors.company}
									onChange={this.onChange}
									info='Could be your own company or the one you work for'/>
								<TextFieldGroup
									placeholder='Location'
									name='location'
									value={this.state.location}
									error={errors.location}
									onChange={this.onChange}
									info='City or city & state suggested (eg. Boston, MA)'/>
								<TextFieldGroup
									placeholder='Skills'
									name='skills'
									value={this.state.skills}
									error={errors.skills}
									onChange={this.onChange}
									info='Please use comma to separate values (eg. HTML,CSS)'/>
								<TextFieldGroup
									placeholder='Github Username'
									name='githubusername'
									value={this.state.githubusername}
									error={errors.githubusername}
									onChange={this.onChange}
									info='Your github username'/>
								<TextAreaGroup
									placeholder='Short Bio'
									name='bio'
									value={this.state.bio}
									error={errors.bio}
									onChange={this.onChange}
									info='Tell us a little bit about yourself'/>
								<div className="mb-3">
									<button type='button' onClick={() => {
										this.setState(prevState => ({
											displaySocialInputs: !prevState.displaySocialInputs
										}));
									}}
									        className="btn-light">
										Add social network links
									</button>
									<span className="text-muted">Optional</span>
									{socialInputs}
									<input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})
export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));
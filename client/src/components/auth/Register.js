import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}
		console.log(newUser);
		this.props.registerUser(newUser, this.props.history);


	}

	render() {
		const {errors} = this.state;
		// this equals to:
		// const errors = this.state.errors;

		return (
			<div className="register">

				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your SciConnector account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<TextFieldGroup
									onChange={this.onChange}
									name='name'
									type='text'
									value={this.state.name}
									placeholder='Name'
									error={errors.name}/>
								<TextFieldGroup
									onChange={this.onChange}
									name='email'
									type='email'
									value={this.state.email}
									placeholder='Email Address'
									error={errors.email}
									info='This site uses Gravatar so if you want a profile image, use a Gravatar email'/>
								<TextFieldGroup
									onChange={this.onChange}
									name='password'
									type='password'
									value={this.state.password}
									placeholder='Password'
									error={errors.password}/>
								<TextFieldGroup
									onChange={this.onChange}
									name='password2'
									type='password'
									value={this.state.password2}
									placeholder='Confirm Password'
									error={errors.password2}/>
								<input type="submit" className="btn btn-info btn-block mt-4"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
})

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
// You can get access to the history object's properties and the closest <Route>'s match
// via the withRouter higher-order component. withRouter will pass updated match, location,
// and history props to the wrapped component whenever it renders.
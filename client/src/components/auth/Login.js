import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {loginUser} from "../../actions/authActions";
import TextFieldGroup from '../common/TextFieldGroup';


class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	};
	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}
	onSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData);
	}
	render() {
		const {errors} = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to your SciConnector account</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									onChange={this.onChange}
									name='email'
									type='email'
									value={this.state.email}
									placeholder='Email Address'
									error={errors.email}/>
								<TextFieldGroup
									onChange={this.onChange}
									name='password'
									type='password'
									value={this.state.password}
									placeholder='Password'
									error={errors.password}/>
								<input type="submit"
								       className="btn btn-info btn-block mt-4"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { loginUser })(Login);
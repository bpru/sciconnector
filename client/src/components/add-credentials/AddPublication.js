import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";
import TextFieldGroup from "../common/TextFieldGroup";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import {addPublication} from "../../actions/profileActions";
import TextAreaGroup from "../common/TextAreaGroup";

class AddPublication extends Component {
	state = {
		title: '',
		year: '',
		journalinfo: '',
		authors: '',
		link: '',
		errors: ''
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit = e => {
		e.preventDefault();
		const pubData = {
			title: this.state.title,
			year: this.state.year,
			journalinfo: this.state.journalinfo,
			authors: this.state.authors,
			link: this.state.link
		}
		this.props.addPublication(pubData, this.props.history);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	render() {
		const {errors} = this.props;
		return (
			<div className="add-publication">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link className="btn btn-light" to="/dashboard">Go Back</Link>
							<h1 className="display-4 text-center">Add Publication</h1>
							<p className="lead text-center">Add your selected publications</p>
							<small className="d-block pd-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextAreaGroup
									placeholder='* Title'
									value={this.state.title}
									name='title'
									onChange={this.onChange}
									error={errors.title}/>
								<TextFieldGroup
									placeholder='* Year'
									value={this.state.year}
									name='year'
									onChange={this.onChange}
									error={errors.year}/>
								<TextFieldGroup
									placeholder='* Journal Info'
									value={this.state.journalinfo}
									name='journalinfo'
									onChange={this.onChange}
									error={errors.journalinfo}/>
								<TextAreaGroup
									placeholder="* Authors"
									value={this.state.authors}
									name='authors'
									onChange={this.onChange}
									error={errors.authors}
									info="Please use comma to separate values (eg. Chiang J, Wang H)"/>
								<h6>Link</h6>
								<TextFieldGroup
									placeholder="Link"
									value={this.state.link}
									name='link'
									onChange={this.onChange}
									error={errors.link}/>
								<input type="Submit" value="submit" className="btn btn-info btn-block mt-4"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddPublication.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addPublication: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, {addPublication})(withRouter(AddPublication));
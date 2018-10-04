import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deletePublication} from '../../actions/profileActions';

class Publication extends Component {

	onDeleteClick = (id) => {
		this.props.deletePublication(id);
	}

	render() {
		const publications = this.props.publications.map(pub => (
			<div className="row">
				<div className="col-md-10">
					<p>
						{`${pub.authors}. ${pub.year} "${pub.title}", ${pub.journalinfo}`}
					</p>
				</div>
				<div className="col-md-2">
					<button className="btn btn-danger" onClick={() => this.onDeleteClick(pub._id)}>Delete</button>
				</div>
			</div>

		))
		return (

			<div>
				<h4 className="mb-4">Selected Publications</h4>
					{publications}
			</div>
		);
	}
}

Publication.propTypes = {
	deletePublication: PropTypes.func.isRequired,
	publications: PropTypes.array.isRequired
}

export default connect(null, { deletePublication })(Publication);
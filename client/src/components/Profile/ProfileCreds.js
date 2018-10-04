import React, {Component} from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
	render() {
		const {experience, education, publications} = this.props;
		const expItems = experience.map(exp => (
			<li key={exp._id} className="list-group-item">
				<h4>{exp.company}</h4>
				<p>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment> -
						<Moment format="YYYY/MM/DD">{exp.to? exp.to : " Now"}</Moment>
				</p>
				<p>
					<strong>Position: </strong>{exp.title}
				</p>
				<p>
					{exp.location === '' ? null : (<span><strong>Location: </strong>{exp.location}</span>)}
				</p>
				<p>
					{exp.description === '' ? null : (<span><strong>Description: </strong>{exp.description}</span>)}
				</p>
			</li>
		))

		const eduItems = education.map(edu => (
			<li key={edu._id} className="list-group-item">
				<h4>{edu.school}</h4>
				<p>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment> -
					<Moment format="YYYY/MM/DD">{edu.to? edu.to : " Now"}</Moment>
				</p>
				<p>
					<strong>Degree: </strong>{edu.degree}
				</p>
				<p>
					<strong>Major: </strong>{edu.major}
				</p>
				<p>
					{edu.location === '' ? null : (<span><strong>Location: </strong>{edu.location}</span>)}
				</p>
				<p>
					{edu.description === '' ? null : (<span><strong>Description: </strong>{edu.description}</span>)}
				</p>
			</li>
		));

		const pubItems = publications.map(pub => (
			<li key={pub._id} className={"list-group-item"}>
				<p>
					{`${pub.authors}. ${pub.year} "`}<strong>{pub.title}</strong>{`" , ${pub.journalinfo}`}
				</p>
			</li>
		))
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<h3 className="text-info text-center">Experience</h3>
						{expItems.length > 0 ? (
							<ul className="list-group">
								{expItems}
							</ul>
						) : (
							<p className="text-center">No Experience Listed</p>
						)}
					</div>
					<div className="col-md-6">
						<h3 className="text-info text-center">Education</h3>
						{eduItems.length > 0 ? (
							<ul className="list-group">
								{eduItems}
							</ul>
						) : (
							<p className="text-center">No Education Listed</p>
						)}
					</div>
				</div>
				<br/>
				<div className="row">
					<div className="col-md-12">
						<h3 className="text-info text-center">Selected Publications</h3>
						{pubItems.length > 0 ? (
							<ul className="list-group">
								{pubItems}
							</ul>
						) : (
							<p className="text-center">No Publication Listed</p>
						)}
					</div>
				</div>
			</div>

		);
	}
}

export default ProfileCreds;
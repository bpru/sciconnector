import React from 'react';
import classnames from'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = (props) => {
	const selectOptions = props.options.map(
		option => (
			<option value={option.value}
							key={option.label}>
				{option.label}
			</option>
		));

	return (
		<div className="form-group">
			<select className={classnames("form-control form-control-lg", {'is-invalid': props.error})}
			        value={props.value}
			        onChange={props.onChange}
			        name={props.name}
							error={props.error}>
				{selectOptions}
			</select>
			{props.info && <small className="form-text text-muted">{props.info}</small>}
			{props.error && <div className='invalid-feedback'>{props.error}</div>}
		</div>
	);
};

SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired
}

SelectListGroup.defaultProps = {
	type: 'text'
}

export default SelectListGroup;
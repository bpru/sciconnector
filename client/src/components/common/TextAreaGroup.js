import React from 'react';
import classnames from'classnames';
import PropTypes from 'prop-types';

const TextAreaGroup = (props) => {
	return (
		<div className="form-group">
			<textarea className={classnames("form-control form-control-lg", {'is-invalid': props.error})}
			       placeholder={props.placeholder}
			       value={props.value}
			       onChange={props.onChange}
			       name={props.name}/>
			{props.info && <small className="form-text text-muted">{props.info}</small>}
			{props.error && <div className='invalid-feedback'>{props.error}</div>}
		</div>
	);
};

TextAreaGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
}

TextAreaGroup.defaultProps = {
	type: 'text'
}

export default TextAreaGroup;
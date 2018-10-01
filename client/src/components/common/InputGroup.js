import React from 'react';
import classnames from'classnames';
import PropTypes from 'prop-types';

const InputGroup = (props) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className="icon"/>
				</span>
			</div>
			<input className={classnames("form-control form-control-lg", {'is-invalid': props.error})}
			          placeholder={props.placeholder}
			          value={props.value}
			          onChange={props.onChange}
			          name={props.name}/>
			{props.error && <div className='invalid-feedback'>{props.error}</div>}
		</div>
	);
};

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	icon: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
	type: 'text'
}

export default InputGroup;
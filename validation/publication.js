const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePublicationInput(data) {
	let errors = {};


	data.title = !isEmpty(data.title)? data.title: '';
	data.year = !isEmpty(data.year)? data.year: '';
	data.journalinfo = !isEmpty(data.journalinfo)? data.journalinfo: '';
	data.authors = !isEmpty(data.authors)? data.authors: '';
	data.link = !isEmpty(data.link)? data.link: '';


	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title field is required';
	}

	if (Validator.isEmpty(data.year)) {
		errors.year = 'Year field is required';
	}

	if (Validator.isEmpty(data.journalinfo)) {
		errors.journalinfo = 'Journal field is required';
	}

	if (Validator.isEmpty(data.authors)) {
		errors.authors = 'Authors field is required';
	}

	if (!isEmpty(data.link)) {
		if (!Validator.isURL(data.link)) {
			errors.link = 'Not a valid URL';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
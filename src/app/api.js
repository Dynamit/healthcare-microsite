/**
 * Make API calls.
 * A Promise interface on top of superagent.
 */

import request from 'superagent';
import url from 'url';

/**
 * Base url for API requests.
 * `process.API_URL` is transformed for prod builds by webpack
 * @type {[type]}
 */
const API_URL = process.API_URL || 'http://localhost:8081/api/';


/**
 * Construct a well-formatted url for requests
 * @param  {String} endpoint
 * @return {String}
 */
const formatPath = (endpoint) => {
	return API_URL + endpoint.replace(/^\//, '');
};

export default {

	/**
	 * GET
	 * @param  {String} endpoint
	 * @return {Promise}
	 */
	get: (endpoint) => {
		return new Promise((resolve, reject) => {

			// superagent get
			request.get(formatPath(endpoint))
				.end((err, res) => {
					if (err) {
						reject(err)
					} else {
						resolve(res.body);
					}
				});

		});
	}
}

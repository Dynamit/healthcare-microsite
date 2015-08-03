import request from 'superagent';
import url from 'url';

const API_URL = process.API_URL || 'http://localhost:8081/api/';

const formatPath = (endpoint) => {
	return API_URL + endpoint.replace(/^\//, '');
};

export default {
	get: (endpoint) => {
		return new Promise((resolve, reject) => {

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

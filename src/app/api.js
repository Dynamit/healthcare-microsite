import request from 'superagent';
import url from 'url';


export default {
	get: (endpoint) => {
		return new Promise((resolve, reject) => {
			// TODO make API calls to get data
			resolve([{"title":"Introduction","author":"Josh Amer","date":{"raw":"2015-07-01T00:00:00.000Z","formatted":"Jun 30"},"abstract":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ullam suscipit repudiandae?","slug":"introduction"},{"title":"Access: The Patient Will See You Now","author":"Josh Amer","date":{"raw":"2015-07-12T00:00:00.000Z","formatted":"Jul 11"},"abstract":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ullam suscipit repudiandae?","slug":"access-the-patient-will-see-you-now"}]);
		});
	}
}

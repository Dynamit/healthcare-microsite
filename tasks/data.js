/**
 * Consume a glob of files, parse, and write JSON to disk.
 * Writes a json file per entry, and also a meta data file for the entire glob.
 */

import fs from 'fs';
import globby from 'globby';
import markdown from 'markdown-it';
import matter from 'gray-matter';
import moment from 'moment';
import mkdirp from 'mkdirp';
import path from 'path';
import yaml from 'js-yaml';
import { assign, sortBy } from 'lodash';

const md = markdown({ html: true, linkify: true });


/**
 * @param  {Array|String} fileGlob Glob of files
 * @param  {String} destination Where to save .json files
 * @param  {String} metaDestination Whether or not to create a meta file.
 * @return {Object} meta data
 */
export default (fileGlob, destination, metaDestination) => {

	// get files
	let files = globby.sync(fileGlob);

	// create a meta data object
	let meta = {};

	// get meta file name using name of parent folder
	let metaFileName = path.dirname(files[0]).split(path.sep).pop();


	// iterate over each file
	files.forEach(file => {

		// get filename
		let name = path.basename(file, path.extname(file));

		// parse front-matter
		let yfm = matter.read(file, {
			parser: require('js-yaml').safeLoad
		});

		// parse data
		let data = yfm.data;

		let date = moment(data.date).utc();
		date = date.subtract(date.utcOffset());

		// format the date
		data.date = {
			raw: date.format(),
			formatted: date.format('D MMM YYYY')
		}

		// save a slug
		data.slug = name;

		// push to meta
		meta[name] = data;

		// parse markdown
		let content = yfm.content;
		content = md.render(content);

		// save json
		let filePath = path.join(destination, name + '.json');
		let fileContents = JSON.stringify(assign({}, data, { content: content }));

		// create the directory
		mkdirp.sync(path.dirname(filePath));

		// write the file
		fs.writeFileSync(filePath, fileContents);

	});

	// write meta json file to metaDestination
	fs.writeFileSync(path.join(metaDestination, metaFileName + '.json'), JSON.stringify(meta));

	return meta;

}

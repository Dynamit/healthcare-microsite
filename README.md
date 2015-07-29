# healthcare-microsite

## Build

### Features

- Dynamic [HTML templating](https://github.com/fbrctr/fabricator-assemble)
- Sass [compilation](https://github.com/sass/node-sass), [vendor prefixing](https://github.com/postcss/autoprefixer), and [minification](https://github.com/css/csso)
- JavaScript [module bundling](https://github.com/substack/node-browserify), [optimization](https://github.com/mishoo/UglifyJS2), and [linting](https://www.npmjs.com/package/jshint)
- Image [optimization](https://github.com/imagemin/imagemin)
- Code formatting rules via [EditorConfig](http://editorconfig.org/) and [JS Beautifier](https://github.com/beautify-web/js-beautify)

### Local development

Start a local development environment:

```
$ npm start
```

This will compile files, then watch for changes to recompile.

This will also start a server at [http://localhost:3000](http://localhost:3000) that will live-reload when changes are detected.

### Build for distribution

```
$ npm run build
```

In addition to the standard build tasks, this minifies CSS and uglifies JavaScript.

## Configuration

Configuration values are defined in the `config` object in `gulpfile.js`

Available options, with defaults shown:

```javascript
templates: {
	src: ['src/templates/**/*', '!src/templates/+(layouts|components)/**'],
	dest: 'dist',
	watch: ['src/templates/**/*', 'src/data/**/*.json'],
	partials: ['src/templates/components/**/*']
},
scripts: {
	src: './src/assets/scripts/main.js',
	dest: 'dist/assets/scripts',
	watch: 'src/assets/scripts/**/*'
},
styles: {
	src: 'src/assets/styles/main.scss',
	dest: 'dist/assets/styles',
	watch: 'src/assets/styles/**/*',
	browsers: ['last 1 version']
},
images: {
	src: 'src/assets/images/**/*',
	dest: 'dist/assets/images',
	watch: 'src/assets/images/**/*'
}
```

### Definitions

#### {task}.src 
 
Type: `String` or `Array`  
Source files for task.

#### {task}.dest

Type: `String`  
Output destination.

#### {task}.watch

Type: `String` or `Array`  
Files that should trigger recompilation/reload when changed.

### templates.layouts

Type: `String` or `Array`  
Layout templates.

Layouts are wrappers for template content. Templates are inserted into layouts at the `{% body %}` tag.

### templates.partials

Type: `String` or `Array`  
Partial templates.

### templates.data

Type: `String` or `Array`  
Data that can be used when templating pages. Can be either JSON or YAML.

### styles.browsers

Type: `Array`  
Value passed to [Autoprefixer](https://github.com/postcss/autoprefixer#browsers)

## Template Assembly

Templates are assembled using [fabricator-assemble](https://github.com/fbrctr/fabricator-assemble).

There are number of [options](https://github.com/fbrctr/fabricator-assemble#options) available, particularly the ability to define your own Handlebars helpers.

### Custom Helpers

[Helpers](http://jaskokoyn.com/2013/08/08/custom-helpers-handlebars-js-tutorial/) can be define as a object, where the key is the name of the helper and the value is a function.

```javascript
assemble({
	helpers: {
	    markdown: require('helper-markdown'),
	    foo: function () {
	        return 'bar';
	    }
	}
});
```


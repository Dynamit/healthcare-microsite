# Dynamit Healthcare Microsite

> A healthcare-focused microsite, developed as an experiment in ES6, React.js, and isomorphism.

## Overview

TODO about Dynamit and healthcare.

We decided to have a little fun and try something new with this site, so we decided to build it as an pre-rendered single page application (SPA) with [React](http://facebook.github.io/react/). SPAs are powerful because they allow you to de-couple the presentation layer (front-end) from the data layer (back-end). We think this can have a tremendous impact on how projects are architected, so we wanted to tinker to find a solution that worked. This is one of our experiments.

### Architecture

The site is a series of pre-rendered static html files, onto which a React application mounts once the page is loaded.

During the build + deploy process, the `prerender()` task runs and generated the html files. Here's the basic steps it runs through:

1. Interrogate routes from react-router definitions
2. Interpolate dynamic urls (e.g. /article/:slug -> /articles/article-name).
3. Loop through all urls and render corresponding React component tree.
4. Save render as string to `<path>/index.html` file.

This allows a static snapshot of our application to be served to any matching url, which makes the initial load of any page very quick. After the page loads, react-router handles the rest: dispatches the routes, passes down application state.

The same top-level component and router definition is also the client-side app `main.js`. Write once, run everywhere.


### Stack

- [Node.js](http://nodejs.org)
- [Gulp](http://gulpjs.com/)
- [React](http://facebook.github.io/react/)
- [React Router](https://github.com/rackt/react-router)
- [Babel](https://babeljs.io/)

## Usage

### Quick Start

Start-up local development environment:

```
$ npm start
```

Build for production:

```
$ npm run build
```

Preview the production build (using [http-server](https://www.npmjs.com/package/http-server)):

```
$ npm run preview
```

### Publishing Content

There is only one content type in this app: articles. They are written in markdown format, and are located in the `src/data/article` directory.

Here's a basic `.md` template:

```
---
title: <Title>
author: <Author>
avatar: <Image> (relative to /assets/images)
date: <YYYY-MM-DD>
image: <Image> (relative to /assets/images)
thumbnail: <Image> (relative to /assets/images)
abstract: <Abstract>
---

## Sub-title

Content

```

The YAML front-matter is parsed and used as meta data for the article. The content body is parsed and rendered as HTML.

The url is determined by the name of the file. For instance, `my-great-article.md` -> `<baseurl>/article/my-great-article/`


## Retrospective

### Good
- **Very fast** - Nothing serves faster than static html.
- **Scalable** - We're just serving static html, css, js, and images so scaling is just a matter of scaling static hosting. Any data layers (APIs) scale independently.
- **More control over the front-end** - Eliminated the potential for loss of fidelity during a front-end back-end dev hand-off.

### Bad
- **Not for large sites** - Pre-rendering doesn't scale to large data sets. Our app only renders 6 pages. Pre-rendering thousands is a feasible option.
- **Multiple layouts?** - Could be difficult to support views with different layouts. Pre-rendered markup is inserted into the `<body>` of a shared layout wrapper. Unsure of how to allow for a different wrapper.
- **Tightly coupled to React and react-router** - This solution is totally dependent on the design of React and React Router, which does not follow conventions most front-end developers are familiar with. Ramp-up could be slow for devs new to React.
- **Server Error Views** - Still need to define 404 & 500 routing through server configuration. 

### Learnings
- **`<head>`** - Managing `<head>` data is tricky because the app mounts to the `<body>`. Luckily the [react-helmet](https://github.com/nfl/react-helmet) project solves this problem well. Still unconventional and potentially confusing.
- **Pre-rendering async data** - Pre-rendering components with async data dependencies (API) calls is tricky. Since our API calls were local, pre-rendering required spinning up and tearing down a simple http server while the prerender task ran. Also needed to resolve all data before rendering. We achieve this by collating all Promises within the component tree, then executing the rendering after `Promise.all()`.
- **ES6** - ECMA Script 6 syntax is great - it makes code organization much clearer. However, transpiling with Babel requires shimming some functionality. Adding `require('babel-core/polyfill');` to our client-side app gave us the non-ES6 browser support we needed.


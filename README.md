# Metalsmith i18next Sitemap

A very simple [Metalsmith](http://metalsmith.io) plugin that will produce a sitemap that supports i18next localization.

## Installation

```bash
npm install --save-dev metalsmith-i18next-sitemap
```

## Usage

### JavaScript

```js
const sitemap = require( 'metalsmith-i18next-sitemap' );

Metalsmith( __dirname )
    .use( sitemap( {
        pattern: '**/*.html',               // default file pattern to process for include directives
        locales: [ 'en', 'es' ]             // an array of locales you are supporting
    } ) )
    .build( error => {
        if ( error ) {
            console.error( error )
        }
    } );
```

### metalsmith.json

```json
{
  "plugins": {
    "metalsmith-i18next-sitemap": {
      "pattern": "**/*.html",
      "locales": [ "en", "es" ]
    }
  }
}
```

## Options

 - `filename` is the output filename, default: sitemap.xml
 - `lastmod` lets you override the lastmod time in ISO format
 - `pattern` is the glob pattern for matching files to process, default: **/*.html
 - `priority` allows overriding the default priority, default: 0.5
 - `changefreq` sets the change frequency, default: weekly
 - `remove_index` removes index.html from urls, default: true
 - `locales` an array of your supported locales, eg: [ 'en', 'es' ]

## License

The MIT License (MIT)

## Thanks

This plugin was developed at Oportun, Inc.
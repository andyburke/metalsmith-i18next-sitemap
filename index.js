const extend = require( 'extend' );
const fs = require( 'fs' );
const match = require( 'minimatch' );
const path = require( 'path' );
const Sitemap = require( 'sitemap' );

/**
 * @param {Object} options
 * @param {String} options.filename is the output filename, default: sitemap.xml
 * @param {String} options.lastmod lets you override the lastmod time in ISO format
 * @param {String} options.pattern is the glob pattern for matching files to process, default: **\/*.html
 * @param {String} options.priority allows overriding the default priority, default: 0.5
 * @param {String} options.changefreq sets the change frequency, default: weekly
 * @param {Boolean} options.remove_index removes index.html from urls, default: true
 * @param {Array} options.locales an array of your supported locales
 */
module.exports = function( _options ) {
    const options = extend( {
        filename: 'sitemap.xml',
        lastmod: null,
        pattern: '**/*.html',
        priority: 0.5,
        changefreq: 'weekly',
        remove_index: true,
        locales: []
    }, _options );

    return ( files, metalsmith, done ) => {

        const now = new Date().toISOString();
        const sitemap = Sitemap.createSitemap( {
            hostname: options.hostname
        } );

        Object.keys( files ).filter( filename => match( filename, options.pattern ) ).forEach( filename => {
            const file = files[ filename ];

            const basename = path.basename( filename );
            const url = options.remove_index && basename === 'index.html' ? filename.slice( 0, -10 ) : filename;

            const info = {
                url: `/${ url }`,
                priority: file.priority || options.priority,
                changefreq: file.changefreq || options.changefreq,
                lastmodISO: options.lastmod || ( file.stats && file.stats.mtime && file.stats.mtime.toISOString() ) || now
            };

            if ( file.locale ) {
                const unlocalized_url = url.slice( 3 );
                info.links = options.locales.map( locale => {
                    return {
                        lang: locale,
                        url: `${ options.hostname }/${ locale }/${ unlocalized_url }`
                    };
                } );
            }

            sitemap.add( info );
        } );

        files[ options.filename ] = {
            contents: Buffer.from( sitemap.toString() )
        };

        done();
    };
};
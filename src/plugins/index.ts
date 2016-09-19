import * as jwtAuth from './jwtAuthPlugin';

const goodOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [ {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [ { log: '*', response: '*' } ]
        }, {
            module: 'good-console'
        }, 'stdout' ],
        myFileReporter: [ {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [ { ops: '*' } ]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: [ './test/fixtures/awesome_log' ]
        } ],
        myHTTPReporter: [ {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [ { error: '*' } ]
        } ]
    }
};

export default [
    // set up good to log every kind of event. Change according to your needs.

    {
        register: require( 'good' ),
        options: goodOptions
    },
    require( 'inert' ),
    require( 'hapi-auth-jwt2' ),
    require( './jwtAuthPlugin' )
    // require additional plugins here
];


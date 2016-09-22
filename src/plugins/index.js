const jwtAuth = require('./jwtAuthPlugin');

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

module.exports = [
    // set up good to log every kind of event. Change according to your needs.

    {
        register: require( 'good' ),
        options: goodOptions
    },
    require('vision'),
    require( 'inert' ),
    require('hapi-swagger'),
    require( 'hapi-auth-jwt2' ),
    require( './jwtAuthPlugin' ),
    {
        register: require( 'hapi-authorization' ),
        options: {
            roles: [ 'USER', 'ADMIN', ]
        }
    }
    // require additional plugins here
];


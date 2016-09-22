const jwt = require('jsonwebtoken');
const auth = require('../../controllers/index').auth;

module.exports.register = function ( server, options, next ) {
    server.auth.strategy( 'jwt', 'jwt', true, {
        key: 'asdas das d13 4e2!',
        validateFunc: auth.tokenValidation,
        verifyOptions: { algorithms: [ 'HS256' ] }
    } );
    server.route( [ {
        method: 'POST',
        path: '/auth/login',
        config: auth.login.config
    },
        {
            method: 'POST',
            path: '/auth/register',
            config: auth.register.config
        },
        {
            method: 'GET',
            path: '/auth/ping',
            config: auth.ping.config
        } ] );
    next();
};

module.exports.register.attributes = {
    pkg: {
        'name': 'jwtAuthPlugin',
        'version': '1.0.0',
        'description': '',
        'main': 'index.js',
        'keywords': [],
        'author': 'Denis Sadilo',
        'license': 'ISC'
    }
};

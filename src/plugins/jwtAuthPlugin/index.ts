import { Server } from 'hapi';
import * as jwt from 'jsonwebtoken';
import { auth } from '../../controllers';

module.exports.register = function ( server: Server, options, next ) {
    server.auth.strategy( 'jwt', 'jwt', true, {
        key: 'asdas das d13 4e2!',
        validateFunc: auth.tokenValidation,
        verifyOptions: { algorithms: [ 'HS256' ] }
    } );
    server.route( [ {
        method: 'POST',
        path: '/login',
        config: auth.login.config
    },
        {
            method: 'POST',
            path: '/register',
            config: auth.register.config
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

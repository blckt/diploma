import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import models from '../models';
import * as randomString from 'randomstring';


const login = {
    config: {
        auth: false,
        handler: ( request, reply ) => {
            let login = request.payload.login;
            let password = request.payload.password;
            // reply( { login, password } );
            models.User.find( {
                where: {
                    login
                }
            } ).then( user => {
                if ( user.validatePassword( password ) ) {
                    let token = jwt.sign( {
                        id: user.id,
                        login: user.login,
                        createdAt: user.createdAt,
                        role: 'User'
                    }, 'asdas das d13 4e2!', {
                        expiresIn: 60 * 60 * 24 * 14
                    } );
                    reply( { token } );
                } else {
                    reply( { error: 'wron email or password' } );
                }
            } );
        },
        validate: {
            payload: {
                login: Joi.string(),
                password: Joi.string()
            }
        }
    }
};
const ping = {
    config: {
        auth: 'jwt',
        handler: ( request, reply ) => {
            //  console.log( request.auth );
            reply( request.auth.credentials );
        }
    }
};
const getToken = {
    config: {
        handler: ( request, reply ) => {
        }
    }
};

const register = {
    config: {
        auth: false,
        handler: ( request, reply ) => {
            let login = request.payload.login;
            let password = randomString.generate( 12 );
            models.User.findOrCreate( {
                where: {
                    login
                }, defaults: {
                    password
                }
            } ).spread( ( user, isCreated ) => {
                if ( !isCreated ) {
                    return reply( { Error: 'Login already in use' } );
                }
                models.Roles.findById( 1 ).then( role => {
                    user.addRole( role );
                    reply( { password } );
                } );
            } );
        },
        validate: {
            payload: {
                login: Joi.string().max( 16 ).required()
            }
        }
    }
};

const tokenValidation = ( decoded, request, callback ) => {
    let options = {
        'where': {
            id: decoded.id,
            login: decoded.login,
            createdAt: decoded.createdAt
        },
        include: [ { all: true } ]
    };

    models.User.findAll( options ).then( ( data: {id: number, login: string, createdAt: Date, Role?: Array<string> | string; getRole(): Promise } ) => {
        if ( !data ) {
            return callback( null, false, data );
        } else {
            let user = data [ 0 ];
            let roles: Array<string> = JSON.parse( JSON.stringify( user ) ).Role.map( item => item.RoleName );
            callback( null, true, {
                id: user.id,
                createdAt: user.createdAt,
                login: user.login,
                roles
            } );
        }
    } ).catch( err => {
        callback( err, false, null );
    } );
};

export const auth = {
    getToken,
    login,
    ping,
    register,
    tokenValidation
};
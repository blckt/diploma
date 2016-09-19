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
        auth: true,
        handler: ( request, reply ) => {
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
            reply( password );
            models.User.findOrCreate( {
                where: {
                    login
                }, default: {
                    password
                }
            } ).spread( ( user, isCreated ) => {
                if ( !isCreated ) {
                    return reply( { Error: 'Login already in use' } );
                }
                models.Roles.findById( 1 ).then( role => {
                    user.addRole( role );
                    let token = jwt.sign( {
                        id: user.id,
                        login: user.login,
                        createdAt: user.createdAt,
                        role: role.RoleName
                    }, 'asdas das d13 4e2!', {
                        expiresIn: 60 * 60 * 24 * 14
                    } );
                    reply( { token } );
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
    models.User.find( {
        where: {
            id: decoded.id,
            login: decoded.login,
            createdAt: decoded.createdAt
        }
    } ).then( ( data: {id: number, login: string, createdAt: Date, Role?: Array<string> | string } ) => {
        if ( !data ) {
            return callback( null, false, data );
        } else {
            return callback( null, true, data );
        }
    } );
};

export const auth = {
    getToken,
    login,
    ping,
    register,
    tokenValidation
};
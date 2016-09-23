const Joi = require ('joi');
const jwt = require ('jsonwebtoken');
const models = require ('../models');
const randomString = require ('randomstring');
const config = require ('config');

const login = {
  config: {
    auth: false,
    description: 'Login  endpoint',
    notes: 'received login and password in payload load,verifying user and return Auth token',
    tags: ['api'],
    handler: (request, reply) => {
      'use strict';
      let login = request.payload.login;
      let password = request.payload.password;
      console.log (login, password);
      models.User.find ({
              where: {
                login
              }
            })
            .then (user => {
              if (user.validatePassword (password)) {
                let token = jwt.sign ({
                  id: user.id,
                  login: user.login,
                  createdAt: user.createdAt,
                  role: 'User'
                }, config.get ('secret'), {
                  expiresIn: 60 * 60 * 24 * 14
                });
                reply ({ token });
              } else {
                reply ({ error: 'wron email or password' });
              }
            });
    },
    validate: {
      payload: {
        login: Joi.string ()
                  .required (),
        password: Joi.string ()
                     .required (),
      }
    }

  }
};
const ping = {
  config: {
    auth: 'jwt',
    description: 'Ping auth endpoint',
    notes: 'replying status 200 if u logged in',
    tags: ['api'],
    handler: (request, reply) => {

      reply ({ user: request.auth.credentials })
        .code (200);
    }
  }
};
const getToken = {
  config: {
    handler: (request, reply) => {
    }
  }
};

const register = {
  config: {
    auth: false,
    description: 'Registration endpoint',
    notes: 'recieved login as payload and return valid random generated password',
    tags: ['api'],
    handler: (request, reply) => {
      let login = request.payload.login;
      let password = randomString.generate (12);
      models.User.findOrCreate ({
              where: {
                login
              }, defaults: {
                password
              }
            })
            .spread ((user, isCreated) => {
              if (!isCreated) {
                return reply ({ Error: 'Login already in use' });
              }
              models.Roles.findById (1)
                    .then (role => {
                      user.addRole (role);
                      reply ({ password });
                    });
            });
    },
    validate: {
      payload: {
        login: Joi.string ()
                  .max (16)
                  .required ()
      }
    }
  }
};

const tokenValidation = (decoded, request, callback) => {
  let options = {
    'where': {
      id: decoded.id,
      login: decoded.login,
      createdAt: decoded.createdAt
    },
    include: [{ all: true }]
  };

  models.User.findAll (options)
        .then ((data) => {
          if (!data) {
            return callback (null, false, data);
          } else {
            let user = data[0];
            let roles = JSON.parse (JSON.stringify (user))
                            .Role
                            .map (item => item.RoleName);
            callback (null, true, {
              id: user.id,
              createdAt: user.createdAt,
              login: user.login,
              roles
            });
          }
        })
        .catch (err => {
          callback (err, false, null);
        });
};
const resetPassword = {
  auth: false,
  description: 'Reset password',
  notes: 'received email and restores a password',
  tags: ['api'],
  handler: (request, reply) => {

  }
}
const auth = {
  getToken,
  login,
  ping,
  register,
  tokenValidation,
  resetPassword
}
exports.auth = auth;
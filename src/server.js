const Hapi = require('hapi')

const path = require('path');
const settings = require('config');
const routes = require('./routes/routes');
const plugins = require('./plugins');
const initDataBaseData = require('./initDb');
const models = require('./models');
const serverOptions = {
    connections: {
        routes: {
            cors: settings.cors
        }
    }
};
const SYNC_DB_FORCE = process.argv[process.argv.length - 1] === 'true';
/*
 ,
 debug: {
 log: [ 'error', 'response' ],
 request: [ 'error', 'response' ]
 }
 */
const server = new Hapi.Server(serverOptions);
server.connection({
    port: process.env.PORT || process.env.port || settings.port, 
    host: settings.host, routes: {
        files: {
            relativeTo: path.resolve(__dirname, '..', 'src', 'static')
        }
    }
});

// Export the server to be required elsewhere.
module.exports = server;

const initDb = function(cb) {
    'use strict';
    let sequelize = models.sequelize;
    // Test if we're in a sqlite memory database. we may need to run migrations.
    if (sequelize.getDialect() === 'sqlite' &&
        (!sequelize.options.storage || sequelize.options.storage === ':memory:')) {
        sequelize.getMigrator({
            path: process.cwd() + '/migrations',
        }).migrate().success(function() {
            // The migrations have been executed!
            cb();
        });
    } else {
        sequelize.sync({ force: SYNC_DB_FORCE }).then(() => {
            if (SYNC_DB_FORCE) {
                initDataBaseData();
            }
        }).catch(err=>console.log(err));

        sequelize
            .authenticate()
            .then(function(err) {
                cb();
                console.log('Connection has been established successfully.');
            })
            .catch(function (err) {
                console.log('Unable to connect to the database:', err);
            });
    }
};
//EXTENTIONS

require('./extensions')(server);
//
const setup = function(done) {

    // Register all plugins
    server.register(plugins, function(err) {
        if (err) {
            throw err; // something bad happened loading a plugin
        }
    });

    // Add the server routes
    server.route(routes);
    initDb(done);
};

const start = function() {
    server.start(function() {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
};

// If someone runs: "node server.js" then automatically start the server
if (path.basename(process.argv[1], '.js') == path.basename(__filename, '.js')) {
    setup(start);
}

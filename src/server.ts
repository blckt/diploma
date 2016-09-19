import * as Hapi from 'hapi';

const path = require( 'path' );
const settings = require( 'config' );
import routes from './routes/routes';
import plugins from './plugins';
import models from './models';
import initDataBaseData from './initDb';

const serverOptions: Hapi.IServerOptions = {
    connections: {
        routes: {
            cors: settings.cors
        }
    }
};

/*
 ,
 debug: {
 log: [ 'error', 'response' ],
 request: [ 'error', 'response' ]
 }
 */
const server = new Hapi.Server( serverOptions );
server.connection( {
    port: settings.port, host: settings.host, routes: {
        files: {
            relativeTo: path.resolve( __dirname, '..', 'src', 'static' )
        }
    }
} );

// Export the server to be required elsewhere.
module.exports = server;

const initDb = function ( cb ) {
    let sequelize = models.sequelize;
    // Test if we're in a sqlite memory database. we may need to run migrations.
    if ( sequelize.getDialect() === 'sqlite' &&
        (!sequelize.options.storage || sequelize.options.storage === ':memory:') ) {
        sequelize.getMigrator( {
            path: process.cwd() + '/migrations',
        } ).migrate().success( function () {
            // The migrations have been executed!
            cb();
        } );
    } else {
        sequelize.sync( { force: true } ).then( () => {
            cb();
            if ( process.env.NODE_END !== 'production' ) {
                initDataBaseData();
            }
        } );
    }
};

const setup = function ( done ) {

    // Register all plugins
    server.register( plugins, function ( err ) {
        if ( err ) {
            throw err; // something bad happened loading a plugin
        }
    } );

    // Add the server routes
    server.route( routes );

    initDb( done );
};

const start = function () {
    server.start( function () {
        server.log( 'info', 'Server running at: ' + server.info.uri );
    } );
};

// If someone runs: "node server.js" then automatically start the server
if ( path.basename( process.argv[ 1 ], '.js' ) == path.basename( __filename, '.js' ) ) {
    setup( start );
}
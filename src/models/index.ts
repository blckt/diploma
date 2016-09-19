const fs = require( 'fs' );
const path = require( 'path' );
import { Model } from  'sequelize' ;
const Sequelize = require( 'sequelize' );
const config = require( 'config' ).database;
const sequelize = new Sequelize( config.database, config.username, config.password, config );

/*
 MODELS
 */
import * as _user from './user';
import * as _UserInRoles from './usersinroles';
import * as _Roles from './roles';


const db: {User?: Model<{
    login: string,
    password: string,
    validatePassword( password ): boolean;
    id: number;
    createdAt: Date,
    updatedAt: Date,
}, {login: string, password: string}> , sequelize?: any, Sequelize?: any} = {};

fs
    .readdirSync( __dirname )
    .filter( function ( file ) {
        return (file.indexOf( '.' ) !== 0) && (file !== 'index.js') && !/map/.test( file ) && !/(d.ts)$/.test( file );
    } )
    .forEach( function ( file ) {
        const model = sequelize[ 'import' ]( path.join( __dirname, file ) );
        db[ model.name ] = model;
    } );

Object.keys( db ).forEach( function ( modelName ) {
    if ( 'associate' in db[ modelName ] ) {
        db[ modelName ].associate( db );
    }
} );

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;

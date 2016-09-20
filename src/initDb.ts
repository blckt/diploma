/**
 * Created by sadilo on 9/19/2016.
 */
import  models from './models';


export default function () {
    if ( process.env.NODE_ENV !== 'production' ) {
        models.Roles.create( { RoleName: 'USER' } );
        models.Roles.create( { RoleName: 'ADMIN' } ).then( role=> {
            models.User.create( {
                login: 'admin',
                password: 'sadilo1994'
            } ).then( user => {
                user.addRole( role );
            } );
        } );
    }

}
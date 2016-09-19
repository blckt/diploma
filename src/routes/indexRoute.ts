import { resolve, join } from 'path';
export const indexRoute = {
    method: 'GET',
    path: '/{p*}',
    config: {
        auth: false,
        handler: {
            directory: {
                path: function () {
                    const path = join( __dirname, '../..', '/client/build/index.html' );
                    console.log( path );
                    return path;
                },
                index: false,
                listing: false
            }
        }
    }
}
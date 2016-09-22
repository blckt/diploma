const {join,resolve} = require('path');
module.exports = {
    method: 'GET',
    path: '/{p*}',
    config: {
        auth: false,
        handler: {
            directory: {
                path: function () {
                    const path = join( __dirname, '../..', '/client/build/index.html' );
                    return path;
                },
                index: false,
                listing: false
            }
        }
    }
}
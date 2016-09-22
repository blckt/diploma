const {join, resolve} = require('path');
module.exports = [{
    method: 'GET',
    path: '/{p*}',
    config: {
        auth: false,
        handler: {
            directory: {
                path: join(__dirname, '../..', '/client/dist/'),
                index:'index.html',
                lookupCompressed:true

            }
        }
    }
}]
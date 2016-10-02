const controllers = require('../../controllers/xls');
const joi = require('joi')
const xlsPlugin = (server, options, next) => {
    server.route([
        {
            method: 'POST',
            path  : '/xls/file',
            config: {
                payload : {
                    output: 'stream',
                    parse : true,
                    allow : 'multipart/form-data'
                },
                handler : controllers.fileUpload
            }
        }
    ]);
    next()
};

module.exports.register = xlsPlugin
module.exports.register.attributes = {
    pkg: require('./package.json')
};

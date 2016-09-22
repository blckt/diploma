const {resolve}= require('path');
module.exports = function (server) {
    server.ext('onPostHandler', function (request, reply) {
        var req = request.response;
        if (req.isBoom && (req.output.statusCode === 404)) {
            return reply.file(resolve(__dirname, "../../client/dist/index.html"), {
                confine: false
            });
        }
        return reply.continue();
    });
};
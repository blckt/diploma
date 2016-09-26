const excel= require('excellentexport');


export const generateExcel = {
  config: {
    auth: 'jwt',
    description: 'Generate XLS Endpoint',
    notes: 'return xml file to end user',
    tags: ['api'],
    handler: (request, reply)=> {

    }
  }
};

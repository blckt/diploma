const controllers = require('../controllers/students');
module.exports = [
  {
    method:'GET',
    path:'/groups',
    config:{
      auth:'jwt',
      handler:controllers.getGroups
    },
  },
  {
      method:'GET',
      path:'/group/{id}',
      config:controllers.getGroup
  },
  {
    method:'POST',
    path:'/groups/add',
    config:controllers.addGroup
  },{
    method:'POST',
    path:'/students/add',
    config:controllers.addStudent
  }
];
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
    method:'POST',
    path:'/groups/add',
    config:controllers.addGroup
  },{
    method:'POST',
    path:'/students/add',
    config:controllers.addStudent
  }
];
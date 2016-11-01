const handlers = require('../controllers/code');
const addTask = {
  method: 'POST',
  path  : '/task',
  config: handlers.addTask
};
const getTask = {
  method: 'GET',
  path  : '/task/{taskId}',
  config: handlers.getTask
};

const verifyTask={
  method:'POST',
  path:'/task/{taskId}/verify',
  config: handlers.verifyTask
};
const updateTask={
  method:'POST',
  path:'/task/{taskId}/update',
  config: handlers.updateTask
};


module.exports = [addTask, getTask, verifyTask,updateTask];

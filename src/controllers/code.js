/**
 * Created by Denis on 26.10.2016.
 */
const Joi = require('joi');
const models = require('../models');
const code_runner = require('csharp-runner');

const addTask = {
  auth       : 'jwt',
  description: 'Add task',
  tags       : ['api'],
  handler(request, reply){
    const {
      taskTemplate:Template,
      description:Description,
      tests:TestCode,
      taskName:TaskName,
      executeNameSpace:ExecuteNameSpace,
      executeMethod:ExecuteMethod,
      params:Params=null,
      executeClass:ExecuteClass
    } = request.payload;
    models.CodeTask.create({
        Template,
        TaskName,
        TestCode,
        Description,
        Params,
        ExecuteMethod,
        ExecuteNameSpace,
        ExecuteClass
      })
      .then((task)=> {
        reply(task).code(200);
      }).catch((err, ...rest)=> {
      reply(err.errors).code(400)
    });
  },
  validate   : {
    payload: {
      taskName        : Joi.string().required(),
      taskTemplate    : Joi.string().required(),
      description     : Joi.string().required(),
      tests           : Joi.string().required(),
      executeNameSpace: Joi.string().required(),
      executeMethod   : Joi.string().required(),
      executeClass    : Joi.string().required(),
      params          : Joi.string()
    }
  }
};

const getTask = {
  auth    : 'jwt',
  handler(request, reply){
    const { taskId:id } = request.params;
    models.CodeTask.findOne({
      where: {
        id
      }
    }).then((data)=> {
        if (data) {
          reply(data).code(200)
        } else {
          reply([{ message: 'Task not found' }]).code(404)
        }
      })
      .catch(err=>reply([err]).code(500));
  },
  validate: {
    params: {
      taskId: Joi.number().required()
    }
  }
}

const verifyTask = {
  auth    : 'jwt',
  handler(request, reply){
    const { taskId } = request.params;
    const { code } = request.payload;
    models.CodeTask
      .findOne({ where: { id: taskId } })
      .then(task=> {
        code_runner(code,'Foo.Bar','Hello')
          .then(result=>{
            console.log(result)
            reply(result).code(200);
          })
          .catch(err=>console.log(err))
      })
      .catch(err=>reply(err).code(500));
  },
  validate: {
    params : {
      taskId: Joi.number().required()
    },
    payload: {
      code: Joi.string().required()
    }
  }
};

const updateTask = {
  auth       : "jwt",
  description: 'Update task',
  handler(request, reply){
    const { payload:task } = request;
    models.CodeTask.findOne({ where: { id: task.id } })
      .then(dbTask=> {
        let tsk = Object.assign(dbTask, task);
        tsk.save((data)=> {
            reply(data).code(200);
          })
          .catch(err=>reply(err).code(500))
      })
  },
  validate   : {
    payload: {
      id              : Joi.number().required(),
      TaskName        : Joi.string().required(),
      Template        : Joi.string().required(),
      Description     : Joi.string().required(),
      TestCode        : Joi.string().required(),
      ExecuteNameSpace: Joi.string().required(),
      ExecuteMethod   : Joi.string().required(),
      ExecuteClass    : Joi.string().required(),
      params          : Joi.string(),
      createdAt       : Joi.date(),
      updatedAt       : Joi.date()
    },
    params : {
      taskId: Joi.number().required()
    }
  }

}
module.exports = {
  addTask,
  updateTask,
  getTask,
  verifyTask
}
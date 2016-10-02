const { Student, Group, Roles, User } = require('../models');
const Joi = require('joi');

const getGroups = (request, reply)=> {
  Group.findAll().then(data=>reply(data));
};

const addStudent = {
  handler : (request, reply)=> {
    const { GroupNumber, Students } = request.payload;
    Group.findOrCreate({
      where   : {
        Number: GroupNumber
      }
    }).spread((group, isCreated)=> {
      group.getStudent().then(data=>console.log(data.get()));
          Student.bulkCreate(Students).spread(data=>{
            reply({status:'ok'});
            Student.findAll({
              where:{
                createdAt:data.createdAt
              }
            }).then(data=>{
              group.addStudent(data)
              //data.forEach(std=>);
            })
          })
    }).catch(err=> {
      console.log(err);
    })
  },
  validate: {
    payload: {
      GroupNumber: Joi.string().required(),
      Students:Joi.array().required()
    }
  }
};

const addGroup = {
  handler: (request, reply)=> {
    Group.findOrCreate({
      where: {
        Number: request.payload.Number
      }
    }).spread((data, created)=> {
      reply(data);
    })
  }
};

module.exports = {
  getGroups,
  addGroup,
  addStudent,
};
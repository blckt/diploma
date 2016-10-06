const { Student, Group, Roles, User,StudentsInGroups } = require('../models')
const Joi = require('joi')

const getGroups = (request, reply) => {
  Group.findAll().then(data => reply(data))
}
const getGroup = {
  handler: (request, reply) => {
    const { id } = request.params

    Group.find({
      where: {
        id
      }
    }).then((group) => {
      if (group) {
        return group.getStudent().then(students => reply(students));
      }
      reply({ Status: 'Not Found' }).code(404)
    })
  },
  validate: {
    params: {
      id: Joi.number().required()
    }
  }
}

const getStudent = {
  handler:(request,reply)=>{ 
    const {studentId} = request.params;
    Student.find({
      where:{id:studentId},
      include:[{
        model:Group,
        as:'Student'
      }]
    }).then((student)=>{
        if(student){
          console.log(student)
          return reply({
            student
          });
        }
        reply({
          status:'not found'
        }).code(404);
    })
  },
  auth:false
 
}
const addStudent = {
  handler: (request, reply) => {
    const { GroupNumber, Students } = request.payload
    Group.findOrCreate({
      where: {
        Number: GroupNumber
      }
    }).spread((group, isCreated) => {
      group.getStudent().then(data => console.log(data.get()))
      Student.bulkCreate(Students).spread(data => {
        reply({ status: 'ok' })
        Student.findAll({
          where: {
            createdAt: data.createdAt
          }
        }).then(data => {
          group.addStudent(data)
          // data.forEach(std=>)
        })
      })
    }).catch(err => {
      console.log(err)
    })
  },
  validate: {
    payload: {
      GroupNumber: Joi.string().required(),
      Students: Joi.array().required()
    }
  }
}

const addGroup = {
  handler: (request, reply) => {
    Group.findOrCreate({
      where: {
        Number: request.payload.Number
      }
    }).spread((data, created) => {
      reply(data)
    })
  }
}

module.exports = {
  getGroups,
  addGroup,
  getGroup,
  addStudent,
  getStudent,
}

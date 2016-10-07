const { Student, Group, Roles, User, StudentsInGroups, Sessions } = require('../models')
const Joi = require('joi')
const _ = require('underscore');
const async = require('async');
const getGroups = (request, reply) => {
  Group.findAll().then(data => reply(data))
}
const getGroup = {
  handler: (request, reply) => {
    const { id } = request.params

    Group.find({
      where: {
        id
      },
      include: [{ all: true }]
    }).then((group) => {
      if (group) {
        return reply(group);
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
const getGroupStat = {
  handler: (request, reply) => {
    const { grpId } = request.params

    Student.findAll({
      where: {
        grpId
      },
      include: [{ all: true }]
    }).then((group) => {
      if (group) {
        return reply(group);
      }
      reply({ Status: 'Not Found' }).code(404)
    })
  },
  validate: {
    params: {
      grpId: Joi.number().required()
    }
  }
}
const getStudent = {
  handler: (request, reply) => {
    const {studentId} = request.params;
    Student.find({
      where: { id: studentId },
      include:[{all:true}]
    }).then((student) => {
      if (student) {
        return reply({student});
      }
      reply({
        status: 'not found'
      }).code(404);
    })
  },
  auth: 'jwt',
  validate: {
    params: {
      studentId: Joi.number().required()
    }
  }
}
const getStudentSessionsInfo = {
  handler: (request, reply) => {
    const {studentId} = request.params;
    Student.find({
      where: { id: studentId },
      include: [{ model: Sessions }]
    }).then((student) => {
      if (student) {
        const promises = [];
        student.Sessions.forEach(session => {
          promises.push((cb) => {
            session.getExams()
              .then(exams => {
                cb(null, {
                  startYear: session.startYear,
                  endYear: session.endYear,
                  exams
                });
              })
              .catch(err => cb(err));
          })
        })
        return async.series(promises, (err, results) => {
          console.log('HERE!');
          reply({
            info: {
              sessions: results
            }
          })
        })
      }

      reply({
        status: 'not found'
      }).code(404);
    })
  },
  auth: 'jwt',
  validate: {
    params: {
      studentId: Joi.number().required()
    }
  }
}
const addStudentsToGroup = {
  handler: (request, reply) => {
    const { GroupNumber, Students, StudyYears } = request.payload
    Group.findOrCreate({
      where: {
        Number: GroupNumber
      }
    }).spread((group, isCreated) => {
      'use strict';
      let studentsForUpdate = [];
      group.getStudents().then(students => {
        const plainArray = students.map(student => student.get({ plain: true }));
        let studentsToCreate = [];
        let studentsToUpdate = [];
        if (!!plainArray.length) {
          plainArray.forEach((dbStudent, index) => {
            const isStudentExist = Students.some((receivedStudent) => receivedStudent.Name === dbStudent.Name);
            if (!isStudentExist) {
              studentsToCreate.push(receivedStudent);
            } else {
              studentsToUpdate.push({
                student: students[index],
                index
              });
            }
          });
        } else {
          studentsToCreate = Students;
        }
        studentsToCreate.forEach(student => {

          group.createStudent(student).then(created => {
            created.createSession({
              avg: student.sessions[0].avg,
              startYear: StudyYears[0],
              endYear: StudyYears[1]
            }).then(session => {
              student.sessions[0].Exams.forEach(exam => session.createExam(exam));
            })
          });
        });
        studentsToUpdate.forEach(({index, student}) => {
          student.getSessions()
            .then(sessions => {
              console.log(sessions);
            })
        })
        reply({ status: 'ok' })

      });
    })
  },
  validate: {
    payload: {
      GroupNumber: Joi.string().required(),
      Students: Joi.array().required(),
      StudyYears: Joi.array().required(),
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

const addSession = {
  handler: (request, reply) => {
    reply('ok')
  },
  auth: 'jwt',
  validate: {
    payload: {
      session: Joi.array().required(),
      studentId: Joi.number().required()
    }
  }
}
const addSessionToDB = (session, id) => {
  Student.findOne({
    where: {
      id
    }
  }).then(student => {
    student.createSessions(session).then(sess => console.log(sess))
  })
}
module.exports = {
  getGroups,
  addGroup,
  getGroup,
  addStudentsToGroup,
  getStudent,
  addSession,
  getGroupStat,
  getStudentSessionsInfo
}

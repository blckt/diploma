var Group = function() {
    this.number;
    this.Students = [];
};
var Student = function() {
    this.Name;
    this.GroupID;
    this.sessions = [];
    this.isGrant;
    this.isPrives;
    this.StudyType;
    this.nmbInGroup;

};
var Session = function() {
    this.StudentID;
    this.Exams = [];
    this.avg;
};
var Exam = function() {
    this.SessionID;
    this.ExamName;
    this.Balone;
    this.Normal;
    this.Char;
    this.Type;
};
module.exports = {
    Exam,
    Session,
    Student,
    Group
};
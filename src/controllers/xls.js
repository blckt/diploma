const fs = require('fs');
const { resolve } = require('path');
const XLSX = require('xlsx');
const { Exam, Student, Group, Session } =require('../viewModels/xlsModels');
const fileUpload = (request, reply)=> {
  const { file_data:file } = request.payload;
  var name = file.hapi.filename;
  var path = resolve(__dirname, '..', '..', "temp", name);
  var stream = fs.createWriteStream(path);
  stream.on('error', function(err) {
    console.error(err)
  });
  file.pipe(stream);
  
  file.on('end', function(err) {
    parseXls(path, reply);
  });
};

const parseXls = (path, reply)=> {
  fs.readFile(path, (err, data)=> {
    var buffered = new Uint8Array(data);
    var arr = new Array();
    for (var i = 0; i != buffered.length; ++i) arr[i] = String.fromCharCode(buffered[i]);
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, { type: "binary" });
    var parsed = parseWorkbook(workbook);
    reply(parsed);
  })
}
function toCsv (workbook) {
  var result = [];
  workbook.SheetNames.forEach(function(sheetName) {
    var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    if (csv.length > 0) {
      result.push("SHEET: " + sheetName);
      result.push("");
      result.push(csv);
    }
  });
  return result[result.length - 1].split('\n');
}

var sheetNames = function() {
  var Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var Arr = (function() {
    var _arr = [];
    for (var i = 0; i < Alphabet.length; i++) {
      _arr.push(Alphabet[i].toUpperCase());
    }
    for (var i = 0; i < Alphabet.length; i++) {
      for (var j = 0; j < Alphabet.length; j++) {
        var str = Alphabet[i] + Alphabet[j];
        _arr.push(str.toUpperCase());
      }
    }
    return _arr;
  })();
  
  
  return Arr;
}
const parseWorkbook = function(file) {
  var firstSheetName = file.SheetNames[0];
  var worksheet = file.Sheets[firstSheetName];
  var grp = new Group();
  grp.number = worksheet['B2'].v.trim().match(/\d{1,3}\S{1,3}?$/)[0];
  grp.StudyYears=worksheet['B2'].v.trim().match(/\b\d+\/\d+\b/)[0].split('/');
  var students = [];
  var index = 5;
  var prim = 0;
  //console.log(worksheet['D'+40])
  var sheetName = sheetNames();
  while (typeof (worksheet['D' + index]) !== 'undefined') {
    
    var std = new Student();
    var session = new Session();
    std.Name = worksheet['D' + index].v;
    std.isPrives = worksheet['A' + index].v;
    std.nmbInGroup = worksheet['C' + index].v;
    std.StudyType = worksheet['B' + index].v;
    std.isGrant = worksheet['E' + index].v ? true : false;
    session.avg = worksheet['F' + index].v;
    var counter = 0;
    var multiple = 3;
    for (var i = 7; i < sheetName.length;) {
      
      if (worksheet[sheetName[i] + '4']) {
        var ex = new Exam();
        ex.Type = worksheet[sheetName[i] + '3'].v;
        ex.ExamName = worksheet[sheetName[i] + '4'].v;
        ex.Balone = worksheet[sheetName[i - 1] + index].v;
        ex.Char = worksheet[sheetName[i + 1] + index].v;
        ex.Normal = worksheet[sheetName[i] + index].v;
        session.Exams.push(ex);
        i += multiple;
      }
      else {
        counter++;
        i += 1;
        multiple = 4;
        multiple === 4 ? multiple - 1 : multiple;
        // break;
      }
      if (counter > 3) {
        prim = i;
        break;
      }
    }
    for (var i = prim - 2; i < sheetName.length; i++) {
      if (worksheet[sheetName[i] + '4']) {
        var exa = new Exam();
        exa.ExamName = worksheet[sheetName[i] + '4'].v;
        exa.Normal = worksheet[sheetName[i] + index].v
        session.Exams.push(exa);
      }
    }
    
    std.sessions.push(session);
    students.push(std);
    
    index++;
  }
  
  grp.Students = students;
  return grp;
}

const handlers = {
  fileUpload
};


module.exports = handlers;
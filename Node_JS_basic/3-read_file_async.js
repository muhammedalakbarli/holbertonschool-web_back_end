const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, database) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = database
        .split('\n')
        .filter((line) => line.trim() !== '')
        .slice(1);
      const studentsByField = {};

      for (const line of lines) {
        const student = line.split(',');
        const firstName = student[0];
        const field = student[3].trim();

        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstName);
      }

      console.log(`Number of students: ${lines.length}`);

      for (const field of Object.keys(studentsByField)) {
        const students = studentsByField[field];
        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;

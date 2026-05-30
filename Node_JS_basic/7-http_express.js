const fs = require('fs');
const express = require('express');

const app = express();
const databasePath = process.argv[2];

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
      const output = [`Number of students: ${lines.length}`];

      for (const line of lines) {
        const student = line.split(',');
        const firstName = student[0];
        const field = student[3].trim();

        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstName);
      }

      for (const field of Object.keys(studentsByField)) {
        const students = studentsByField[field];
        output.push(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }

      resolve(output.join('\n'));
    });
  });
}

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.type('text/plain');
  countStudents(databasePath)
    .then((students) => {
      res.send(`This is the list of our students\n${students}`);
    })
    .catch((error) => {
      res.send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(1245);

module.exports = app;

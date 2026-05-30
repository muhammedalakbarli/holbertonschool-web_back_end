const fs = require('fs');
const http = require('http');

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

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    countStudents(databasePath)
      .then((students) => {
        res.end(`This is the list of our students\n${students}`);
      })
      .catch((error) => {
        res.end(`This is the list of our students\n${error.message}`);
      });
    return;
  }

  res.end();
});

app.listen(1245);

module.exports = app;

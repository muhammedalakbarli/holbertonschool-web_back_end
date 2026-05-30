const fs = require('fs');

function countStudents(path) {
  let database;

  try {
    database = fs.readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error('Cannot load the database');
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
}

module.exports = countStudents;

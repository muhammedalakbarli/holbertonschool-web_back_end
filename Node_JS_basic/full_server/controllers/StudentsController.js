import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2])
      .then((studentsByField) => {
        const output = ['This is the list of our students'];
        const fields = Object.keys(studentsByField).sort((a, b) => (
          a.toLowerCase().localeCompare(b.toLowerCase())
        ));

        fields.forEach((field) => {
          const students = studentsByField[field];
          output.push(
            `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`,
          );
        });

        response.status(200).type('text/plain').send(output.join('\n'));
      })
      .catch(() => {
        response.status(500).type('text/plain').send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).type('text/plain').send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(process.argv[2])
      .then((studentsByField) => {
        const students = studentsByField[major] || [];
        response.status(200).type('text/plain').send(`List: ${students.join(', ')}`);
      })
      .catch(() => {
        response.status(500).type('text/plain').send('Cannot load the database');
      });
  }
}

export default StudentsController;

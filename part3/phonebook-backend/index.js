require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('data', req => {
  if (Object.keys(req.body).length !== 0) {
    return JSON.stringify(req.body);
  }
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.get('/api/persons', (_request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    console.log('Person returned', person.toJSON());
    response.json(person.toJSON());
  });
});

app.get('/info', (_request, response) => {
  Person.find({}).then(persons => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people.<br/>${Date()}</p>`
    );
  });
});

app.post('/api/persons', (request, response) => {
  const newPerson = new Person({
    ...request.body,
  });

  /*   if (!newPerson.name) {
    return response.status(400).json({ error: 'name is missing' });
  }

  if (!newPerson.number) {
    return response.status(400).json({ error: 'number is missing' });
  }

  if (persons.some(person => person.name === newPerson.name)) {
    return response.status(400).json({ error: 'name must be unique' }).end();
  } */
  newPerson.save();
  response.status(201).json(newPerson.toJSON());
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

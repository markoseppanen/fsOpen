const e = require('express');
const express = require('express');
const morgan = require('morgan');
const app = express();

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.use(express.json());

morgan.token('data', req => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.get('/api/persons', (_request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  }
  response.status(404).end();
});

app.get('/info', (_request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people.<br/>${Date()}</p>`
  );
});

app.post('/api/persons', (request, response) => {
  const newPerson = {
    id: Math.floor(Math.random() * 10000),
    ...request.body,
  };

  if (!newPerson.name) {
    return response.status(400).json({ error: 'name is missing' });
  }

  if (!newPerson.number) {
    return response.status(400).json({ error: 'number is missing' });
  }

  if (persons.some(person => person.name === newPerson.name)) {
    return response.status(400).json({ error: 'name must be unique' }).end();
  }

  persons = [...persons, newPerson];
  response.status(200).json({ success: 'person added' });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

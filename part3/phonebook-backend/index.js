const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("dist"));

morgan.token("data", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data"),
);

// GET-routes start

app.get("/api/persons", (_request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  response.json(person);
});

app.get("/info", (_request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><br/><p>${Date()}</p>`,
  );
});

// DELETE-routes start

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const index = persons.findIndex((person) => person.id === id);

  if (index !== -1) {
    persons.splice(index, 1);
  }

  response.status(204).end();
});

// POST-routes start

app.post("/api/persons", (request, response) => {
  const newPerson = {
    id: Math.random().toString(32).slice(2), // generate base32 id
    ...request.body,
  };

  if (!newPerson.name) {
    return response.status(400).json({ error: "name is missing" });
  }

  if (!newPerson.number) {
    return response.status(400).json({ error: "number is missing" });
  }

  if (persons.some((person) => person.name === newPerson.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  persons.push(newPerson);

  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

const Person = require("./models/person");

const errorHandler = (error, _request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

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
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      console.error(error);
      response.status(500).end();
    });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.error(error);
      response.status(400).send({ error: "malformed id" });
    });
});

app.get("/info", (_request, response) => {
  Person.countDocuments({})
    .then((count) => {
      response.send(
        `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`,
      );
    })
    .catch((err) => {
      console.error(err);
      response.status(500).end();
    });
});

// DELETE-routes start

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((_result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// POST-routes start

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "name is missing" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "number is missing" });
  }

  // if (persons.some((person) => person.name === newPerson.name)) {
  //   return response.status(400).json({ error: "name must be unique" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

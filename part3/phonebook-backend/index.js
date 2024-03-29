require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('data', request => {
  if (Object.keys(request.body).length !== 0) {
    return JSON.stringify(request.body)
  }
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

app.get('/api/persons', (_request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end
      }
    })
    .catch(error => next(error))
})

app.get('/info', (_request, response, next) => {
  Person.find({})
    .then(persons => {
      response.send(
        `<p>Phonebook has info for ${persons.length} people.<br/>${Date()}</p>`
      )
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const newPerson = new Person({
    ...request.body
  })

  newPerson
    .save()
    .then(savedPerson => response.status(201).json(savedPerson.toJSON()))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const updatedPerson = { ...request.body }
  console.log('updated person', updatedPerson)
  Person.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const updatedPerson = new Person({
    ...request.body
  })

  Person.findByIdAndRemove(request.params.id, updatedPerson)
    .then(_result => response.status(204).end())
    .catch(error => next(error))
})

const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

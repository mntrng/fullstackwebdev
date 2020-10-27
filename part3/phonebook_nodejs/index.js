const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const Phone = require('./models/phonebook')

const app = express()
app.use(express.json())
app.use(cors())

// Define custom token to get the body from request
morgan.token('logger', function (req) {
  return JSON.stringify(req.body)
})
// Define custome output for the logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :logger'))
app.use(express.static('build'))

const PORT = process.env.PORT || 3001

app.get('/api/persons', (request, response, next) => {
  Phone.find({}).then(phones => {
    response.json(phones)
  })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Phone.count({}).then(count => {
    response.send(`<p>Phonebook has info for ${count} people</p>
                   ${new Date()}`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phone.findById(id).then(data => {
    if (data) {
      response.json(data)
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phone.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()})
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const insert = new Phone({
    name: body.name,
    phone: body.phone
  })

  insert
    .save()
    .then(storedNumber => {
      response.json(storedNumber)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const content = request.body
  const newData = {
    phone: content.phone
  }

  // runValidators: turn on validation on update
  Phone.findByIdAndUpdate(request.params.id, newData, { new: true, runValidators: true })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'wrong id format' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send(error.message)
  }

  next(error)
}
app.use(errorHandler)

// 404 is not an error so Express handler does not capture it
app.use(function (req, res) {
  res.status(404).send('Not Found')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
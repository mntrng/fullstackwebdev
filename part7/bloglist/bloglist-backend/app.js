const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info('Connected to DB!')
    })
    .catch((error) => {
        logger.error(error.message)
    })

app.use(express.static(__dirname + '/build'))
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(logger.logger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('*', function (req, res) {
    res.sendFile(path.resolve('./build/index.html'))
}) 

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
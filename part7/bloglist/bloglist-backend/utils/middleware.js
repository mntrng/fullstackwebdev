const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
}

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).send({ error: 'Tsk tsk! Not allowed!' })
    }
    
    logger.error(error.message)
    next(error)
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ Error: 'Not found' })
}

module.exports = {
    errorHandler,
    unknownEndpoint,
    tokenExtractor
}
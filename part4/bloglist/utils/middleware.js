const logger = require('./logger')

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })

    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    
    logger.error(error.message)
    next(error)
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ Error: 'Not found' });
};

module.exports = {
    errorHandler,
    unknownEndpoint
}
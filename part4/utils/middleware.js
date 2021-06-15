const { response } = require('express')
const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('Body:', req.body)
    logger.info('--------------------------------')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, resp, next) => {
    if (err.name === 'CastError') {
        return resp.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return resp.status(400).json({ error: err.message })
    }

    next(err)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = { //exports the function
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization') 

        if (!headerToken) { //result if auth doesnt work
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) { // if there is an error this happens
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next() //goes to the next login
    }
}
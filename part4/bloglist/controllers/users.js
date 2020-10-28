const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const content = request.body

    // cost factor
    const saltRounds = 10
    // the plain pwd is not stored in the db, the hashed pwd is stored instead.
    const passwordHash = await bcrypt.hash(content.password, saltRounds)

    if (!content.username || !content.password) {
        return response.status(400).json({ error: 'Username and password must be supplied!' })
    } else {
        if (content.password.length < 3) {
            return response.status(400).json({ error: 'Short password. Min length is 3!' })
        }
    }

    const user = new User({
        username: content.username,
        name: content.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, id: 1})

    response.json(users)
})

module.exports = usersRouter
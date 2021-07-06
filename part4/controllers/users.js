const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

    res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body

    if (!password) {
        return res.status(400).json({ error: 'password missing' })
    }

    if (password.length < 3) {
        return res.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    let user = new User({
        username: username,
        name: name,
        passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

module.exports = usersRouter
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const userHelper = require('../utils/test_helper')

const api = supertest(app)

describe('invalid users not created', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({
            username: 'tranhuy',
            name: 'Huy Tran',
            passwordHash
        })
    
        await user.save()
    })

    test('user with duplicate username not created', async () => {
        const usersAtStart = await userHelper.usersInDb()
    
        const newUser = {
            username: 'tranhuy',
            name: 'Huy Tran',
            password: 'testing123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await userHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user without username/password not created', async () => {
        const usersAtStart = await userHelper.usersInDb()
    
        const newUser = {
            username: 'jdoe',
            name: 'John Doe'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await userHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user with username/password less than 3 characters not created', async () => {
        const usersAtStart = await userHelper.usersInDb()
    
        const newUser = {
            username: 'jsimpson',
            name: 'Jessical Simpson',
            password: 'js'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await userHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
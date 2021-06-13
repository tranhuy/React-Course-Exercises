require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const Contact = require('./models/contact')

//Exercise 3-7
//create logger middleware based on morgan library and take it into use
//const logger = morgan('tiny')
//app.use(logger);

//Exercise 3-8
morgan.token('contact', function(req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contact', {
    skip: function (req, resp) { return req.method !== 'POST' }
}));

let phonebook = [
    {
        "name": "Arto Hellas",
        "phone": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "phone": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "phone": "12-43-234345",
        "id": 3
    }
]

let info = `<p>Phonebook has info for ${phonebook.length} people</p><p>${new Date()}</p>`

app.get('/info', (request, response) => {
    Contact.find({})
        .then(contacts => {
            response.send(`<p>Phonebook has info for ${contacts.length} people</p><p>${new Date()}</p>`);
        })    
})

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })    
})

app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact)
            } else {
                response.status(404).end()
            }            
        })
        .catch(err => {
            console.log(err)
            next(err)
        })

    /* const id = Number(request.params.id);
    const person = phonebook.find(p => p.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }     */
})

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            if (result) {
                response.status(204).end();
            } else {
                next('Contact does not exist')
            }
            
        })
        .catch(err => {
            next(err)
        })

    /* const id = Number(request.params.id); 
    phonebook = phonebook.filter(p => p.id !== id);

    response.status(204).end(); */
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ error: 'name is missing' })
    }

    if (!body.phone) {
        return response.status(400).json({ error: 'phone is missing' })
    }

    let newContact = new Contact({
        name: body.name,
        phone: body.phone
    })

    newContact.save().then(savedContact => {
        response.json(savedContact)
    })

    /* if (phonebook.filter(p => p.name === body.name).length > 0) {
        return response.status(400).json({ error: 'name must be unique' })
    } */

    /* const person = {
        name : body.name,
        phone: body.phone,
        id: generateId()
    } */

    //phonebook = phonebook.concat(person);

    //response.json(person);
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    let contact = {
        name: body.name,
        phone: body.phone
    }

    Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(err => {
            next(err)
        })

    /* const id = Number(request.params.id); 
    const updatedPerson = request.body;

    phonebook = phonebook.map(p => p.id !== id ? p : updatedPerson)

    response.json(updatedPerson); */
})

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } 

    next(err)
}

app.use(errorHandler)


const generateId = () => {
    const maxId = phonebook.length > 0 ? Math.max(...phonebook.map(p => p.id)) : 0;

    return maxId + 1;
}

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
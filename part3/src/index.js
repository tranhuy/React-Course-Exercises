const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

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
    response.send(info);
})

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = phonebook.find(p => p.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id); 
    phonebook = phonebook.filter(p => p.id !== id);

    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ error: 'name is missing' })
    }

    if (phonebook.filter(p => p.name === body.name).length > 0) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        name : body.name,
        phone: body.phone,
        id: generateId()
    }

    phonebook = phonebook.concat(person);

    response.json(person);
})

const generateId = () => {
    const maxId = phonebook.length > 0 ? Math.max(...phonebook.map(p => p.id)) : 0;

    return maxId + 1;
}

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
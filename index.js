//imports
const express = require('express');
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.static('dist'))


// Hard coded data for testing
let persons = [
      {
        "id": "1",
        "Name": "MR. 1",
        "Number": "123456"
      },
      {
        "id": "0da3",
        "Name": "awdawd",
        "Number": "89789"
      },
      {
        "Name": "MR. 2",
        "Number": "46542312",
        "id": "9130"
      }
    ]



//Routes
//Homepage
app.get('/', (request, response) => {
    response.send('Welcome to the Phonebook API!')
})

//info page 
app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`Phonebook has info for ${persons.length} people <br> ${date}`)
})

//Get all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//Get person by id
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(guy => guy.id === id)
  
  if (!person) {
    return response.status(404).json({ error: 'person not found'})
  }
  return response.json(person)
})

//Delete person by id
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const existing = persons.some(guy => guy.id === id)

  if (!existing) {
    return response.status(404).json({ error: 'person not found'})
  }
  persons = persons.filter(guys => guys.id !== id)
  response.status(204).end()
})

//Post add new person
app.post('/api/persons', (request, response) => {
  const body = request.body
  const newId = Math.floor(Math.random() * 10000)

  if (!body.Name || !body.Number) {
    return response.status(400).json({ error: 'Name or Number is missing' })
  }

  const existingName = persons.some(person => person.Name === body.Name
  )
  if (existingName) {
    return response.status(400).json({ error: 'Name must be unique' })
  }

  const existingNumber = persons.some(person => person.Number === body.Number
  )
  if (existingNumber) {
    return response.status(400).json({ error: 'Number must be unique' })
  }

  const newPerson = {
    id: body.id || newId.toString(),
    Name: body.Name,
    Number: body.Number
  }

  persons = [...persons, newPerson]
  response.status(201).json(newPerson)
})

//Update person by id
app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const body = request.body
  const person = persons.find(guy => guy.id === id)

  if (!person) {
    return response.status(404).json({ error: 'person not found'})
  }

  if (!body.Number) {
    return response.status(400).json({ error: 'Name or Number is missing' })
  }

  const updatedPerson = {...person, Number: body.Number }
  persons = persons.map(guy => guy.id !== updatedPerson.id ? guy : updatedPerson)

  response.status(201).json(updatedPerson)
} )



//Unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)



//PORT
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} for testing`)
;
    
})
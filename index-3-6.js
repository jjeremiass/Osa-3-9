const express = require('express')

const app = express()

app.use(express.json())


let persons = [
    {
      name: "Arto Hellas",
      number: "050-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]


app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
const id = Number(request.params.id)
const person = persons.find(note => note.id === id)


if (person) {
    response.json(person)
} else {
    response.status(404).end()
}
})

app.get('/info', (request, response) => {
    const currentTime = new Date().toString();
    response.send(`Phonebook has info for ${persons.length} people <br> ${currentTime}`)
    
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
    }
    const nameExists= persons.some(person=>person.name === body.name);

    if (nameExists){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: persons.length + 1,
    };
  
    persons = persons.concat(person);
  
    response.json(person);

})

    
app.delete('/api/persons/:id', (request, response) => {
const id = Number(request.params.id)
persons = persons.filter(person => person.id !== id)

response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    
  console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const morgan = require('morgan')
const data = require('./data.js')
const {
   parseId, badRequest, forbidden,
   validatePhoneNumber,
   generateId
} = require('./util.js')

const PORT = 3001
let contacts = data.contacts;

app = express()
app.use(express.json())

// FIXME: remove the body from logging (asked by the exercise)
morgan.token('body', (req, resp) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

app.get('/info', (req, resp) => {
   let now = new Date()
   resp.send(`
      <p>Phonebook has ${contacts.length} contacts.</p>
      ${now}
   `)
})

app.get('/api/contacts', (req, resp) => {
   resp.json(contacts);
})

app.get('/api/contacts/:id', (req, resp) => {
   const [id, error] = parseId(req.params.id)
   if (error)
      return badRequest(resp, error)
   let contact = contacts.find(c => c.id === id)
   if (contact != null)
      return resp.json(contact)
   else
      return resp.status(404).end()
})

app.delete('/api/contacts/:id', (req, resp) => {
   const [id, error] = parseId(req.params.id)
   if (error)
      return badRequest(resp, error)
   let index = contacts.findIndex(c => c.id === id)
   if (index >= 0) {
      contacts = contacts.filter(c => c.id !== id)
      return resp.status(204).end()
   } else {
      return resp.status(404).end()
   }
})

app.post('/api/contacts/', (req, resp) => {
   let contact = req.body;

   // Check mandatory arguments are not empty
   if (!contact.name)
      return badRequest(resp, 'Empty name')
   if (!contact.phoneNumber)
      return badRequest(resp, 'Empty phone number')

   // Validate phone number
   contact.phoneNumber = contact.phoneNumber.trim()
   let error = validatePhoneNumber(contact.phoneNumber)
   if (error)
      return badRequest(resp, error)

   // Validate name
   contact.name = contact.name.trim()
   let lowerName = contact.name.toLowerCase()
   if (contacts.some(c => c.name.toLowerCase() === lowerName))
      return forbidden(resp, `The name "${contact.name}" already exists`)

   // Store new contact with a generated ID
   contact.id = generateId()
   contacts.push(contact)
   resp.json(contact)
})


app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
})

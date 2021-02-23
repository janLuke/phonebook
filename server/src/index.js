const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const data = require('./data')
const { generateContactId, forbidden } = require('./util')
const { 
   validateContactData,
   normalizeContactData,
} = require('./validation')


const PORT = process.env.PORT || 3001
let contacts = data.contacts;


app = express()
app.use(cors())
app.use(express.json())

// FIXME: remove the body from logging (it was asked by an exercise)
morgan.token('body', (req, resp) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
app.use(express.static('static'))

app.get('/info', (req, resp) => {
   let now = new Date()
   resp.send(`
      <p>Phonebook has ${contacts.length} contacts.</p>
      ${now}
   `)
})

app.get('/api/contacts', (req, resp) => {
   resp.json(contacts)
})

const injectContactIndexGivenId = (req, resp, next) => {
   const id = parseInt(req.params.id)
   req.params.id = id
   let contactIndex = contacts.findIndex(c => c.id === id)
   if (contactIndex < 0) {
      return resp.status(404).json({
         error: `contact ID not found: ${id}`
      })
   }
   req.contactIndex = contactIndex
   console.log(`Contaxt index for id ${id} is ${req.contactIndex}`);
   next()
}

app.route('/api/contacts/:id')
   .all(
      validateContactData('params'), 
      injectContactIndexGivenId,
   )
   .get((req, resp) => {
      const contact = contacts[req.contactIndex]
      resp.json(contact)
   })
   .delete((req, resp) => {
      contacts.splice(req.contactIndex, 1)
      resp.status(204).end()
   })
   .put((req, resp) => {
      let data = normalizeContactData(req.body)
      let contact = contacts[req.contactIndex]
      contact.name = data.name
      contact.phoneNumber = data.phoneNumber
      resp.json(contact)
   })


app.post('/api/contacts/', validateContactData('body'), (req, resp) => {
   let contact = normalizeContactData(req.body);

   // Ensure the name doesn't already exist
   let lowerName = contact.name.toLowerCase()
   if (contacts.some(c => c.name.toLowerCase() === lowerName))
      return forbidden(resp, `The name "${contact.name}" already exists`)

   // Store new contact with a generated ID
   contact.id = generateContactId()
   contacts.push(contact)
   resp.status(201).json(contact)
})


app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
})

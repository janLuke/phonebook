const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const yup = require('yup');
const { expressYupMiddleware: yupMiddleware } = require('express-yup-middleware')

const data = require('./data')
const { generateContactId, forbidden } = require('./util')
const { contactSchema } = require('./validation')


const PORT = process.env.PORT || 3001
let contacts = data.contacts;

const contactValidator = {
   schema: {
      body: {
         yupSchema: contactSchema,
      },
      params: {
         yupSchema: yup.object().shape({
            id: yup.number().positive().integer(),
         }),
      },
   },
}

const validateContact = (...propertiesToValidate) => yupMiddleware({
   schemaValidator: contactValidator,
   propertiesToValidate
})

const sanitizeContact = (req, resp, next) => {
   req.body.name = req.body.name.trim()
   req.body.phoneNumber = req.body.phoneNumber.trim()
   next()
}


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

app.route('/api/contacts/:id')
   .all(validateContact('params'), (req, resp, next) => {
      const id = parseInt(req.params.id)
      req.params.id = id
      let contactIndex = contacts.findIndex(c => c.id === id)
      console.log(contactIndex);
      if (contactIndex < 0) {
         return resp.status(404).end()
      }
      req.contactIndex = contactIndex
      next()
   })
   .get((req, resp) => {
      const contact = contacts[req.contactIndex]
      if (contact != null)
         resp.json(contact)
      else
         resp.status(404).end()
   })
   .delete((req, resp) => {
      contacts.splice(req.contactIndex, 1)
      resp.status(204).end()
   })
   .put([
      validateContact('body'),
      sanitizeContact
   ], (req, resp) => {
      let contact = contacts[req.contactIndex]
      contact.name = req.body.name
      contact.phoneNumber = req.body.phoneNumber
      resp.json(contact)
   })


app.post('/api/contacts/', [
   validateContact('body'),
   sanitizeContact
], (req, resp) => {
   let contact = req.body;

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

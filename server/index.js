const express = require('express')
const data = require('./data.js')
const { parseId, badRequest } = require('./util.js')

const PORT = 3001
let contacts = data.contacts;

app = express()

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

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
})

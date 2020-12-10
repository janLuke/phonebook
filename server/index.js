const express = require('express')
const { contacts } = require('./data.js')

const PORT = 3001

app = express()

app.get('/info', (req, res) => {
   let now = new Date()
   res.send(`
      <p>Phonebook has ${contacts.length} contacts.</p>
      ${now}
   `)
})

app.get('/api/contacts', (req, res) => {
   res.json(contacts);
})

app.get('/api/contacts/:id', (req, res) => {
   const id = parseInt(req.params.id);
   if (isNaN(id))
      return res.status(400).json({
         error: 'the <id> parameter should be an integer'
      })
   let contact = contacts.find(c => c.id == id)
   if (contact != null)
      return res.json(contact)
   else
      return res.status(404).end()
})

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
})

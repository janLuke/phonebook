const express = require('express')
const { contacts } = require('./data.js')

const PORT = 3001

app = express()

app.get('/api/contacts', (req, res) => {
   res.json(contacts);
})

app.get('/info', (req, res) => {
   let now = new Date()
   res.send(`
      <p>Phonebook has ${contacts.length} contacts.</p>
      ${now}
   `)
})

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
})

const express = require('express')
const { contacts } = require('./data.js')

const PORT = 3001

app = express()

app.get('/api/contacts', (req, res) => {
   res.json(contacts);
})

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
})

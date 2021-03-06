var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')

var myEnv = dotenv.config()
dotenvExpand(myEnv)

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const Contact = require('./models/contact')
const { ResourceNotFound } = require('./errors')


const PORT = process.env.PORT || 3001


app = express()
app.use(cors())
app.use(express.json())

// FIXME: remove the body from logging (it was asked by an exercise)
morgan.token('body', (req, resp) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
app.use(express.static('static'))


// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true,
})
   .then(() => console.log('Successfully connected to database'))
   .catch((err) => console.error(err))


app.get('/info', async (req, resp) => {
   let now = new Date()
   let numContacts = await Contact.count()
   resp.send(`
      <p>Phonebook has ${numContacts} contacts.</p>
      ${now}
   `)
})

app.get('/api/contacts', (req, resp, next) => {
   Contact.find({})
      .then(contacts => resp.json(contacts))
      .catch(next)
})


/**
 * Returns a function that loads a MongoDB object of the provided type, given its id. 
 * @param {*} model 
 */
function entityLoader(model) {
   return async function loadResource(id, { shouldExist = false } = {}) {
      let resource = await model.findById(id)
      if (shouldExist && resource == null)
         throw new ResourceNotFound(id, model.modelName)
      return resource
   }
}

const loadContact = entityLoader(Contact)
const contactNotFoundError = (id) => new ResourceNotFound(id, 'Contact')

app.route('/api/contacts/:id')
   .get((req, resp, next) => {
      loadContact(req.params.id, { shouldExist: true })
         .then(contact => resp.json(contact))
         .catch(next)
   })
   .delete((req, resp, next) => {
      Contact.findByIdAndDelete(req.params.id)
         .then(() => resp.status(204).end())
         .catch(next)
   })
   .put(
      (req, resp, next) => {
         req.body = { name: req.body.name, phoneNumber: req.body.phoneNumber }
         next()
      },
      updateContact)
   .patch(updateContact)

async function updateContact(req, resp, next) {
   try {
      let contactData = req.body;
      let updated = await Contact.findByIdAndUpdate(
         { _id: req.params.id },
         contactData,
         { new: true, runValidators: true, context: 'query' },
      )
      if (updated == null)
         throw contactNotFoundError(req.params.id)
      resp.json(updated)
   } catch (err) {
      next(err)
   }
}

app.post('/api/contacts/', (req, resp, next) => {
   let contactData = req.body
   let contact = new Contact(contactData)
   contact.save()
      .then(c => resp.status(201).json(c))
      .catch(next)
})

// Error handler
app.use((err, req, resp, next) => {
   console.log('obj', err)
   let data;
   switch (err.name) {
      case 'CastError':
         data = {
            status: 400, error: 'BadRequest',
            message: `invalid ${err.path}: ${err.value}`
         }
         break;

      case 'ValidationError':
         let errors = Object.values(err.errors).map(val => val.properties);
         data = {
            status: 400, error: 'ValidationError', errors,
         }
         break;
   }
   if (err.status && err.status < 500)
      data = {
         status: err.status, error: err.name, message: err.message
      }
   if (data != null)
      return resp.status(data.status).json(data)
   next(err)
})

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
})

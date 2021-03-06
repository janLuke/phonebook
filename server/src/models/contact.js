const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')


const contactSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
   },
   phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: /^[+-\d ]+$/,
      maxLength: 20,
      validate: {
         validator: value => value.replace(/\D/g, '').length >= 8,
         message: () => 'a phone number must contain at least 8 digits!'
      }
   }
})

contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
   }
})

let Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact

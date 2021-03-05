const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

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

const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

let Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact

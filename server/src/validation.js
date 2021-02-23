const yup = require('yup');
const { expressYupMiddleware: yupMiddleware } = require('express-yup-middleware')

const CONTACT_NAME_MAX_LEN = 50;

let contactIdSchema = yup.number().positive().integer()

let contactSchema = yup.object().shape({
   name: yup.string().trim().max(CONTACT_NAME_MAX_LEN).required(),
   phoneNumber: yup.string()
      .trim()
      .required()
      .matches(/^[+-\d ]+$/,
         'A phone number can only contain digits, spaces, "+" and "-"')
})

const contactValidator = {
   schema: {
      body: {
         yupSchema: contactSchema,
      },
      params: {
         yupSchema: yup.object().shape({
            id: contactIdSchema,
         }),
      },
   },
}

const validateContactData = (...locations) => yupMiddleware({
   schemaValidator: contactValidator,
   propertiesToValidate: locations
})

const normalizeContactData = (data) => ({
   name: data.name.trim(),
   phoneNumber: data.phoneNumber.trim()
})


module.exports = {
   validateContactData,
   normalizeContactData,
}
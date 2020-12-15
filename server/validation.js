const yup = require('yup');

const CONTACT_NAME_MAX_LEN = 50;

// TODO: this could be shared with the React client
let contactSchema = yup.object().shape({
   name: yup.string().trim().max(CONTACT_NAME_MAX_LEN).required(),
   phoneNumber: yup.string()
      .trim()
      .required()
      .matches(/^[+-\d ]+$/,
         'A phone number can only contain digits, spaces, "+" and "-"')
})

module.exports = {
   contactSchema,
}
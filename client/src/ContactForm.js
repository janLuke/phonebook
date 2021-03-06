import React, { useEffect, useState } from 'react'

const PHONE_FIELD_INSTRUCTIONs =
   'A phone number can only contain digits separated by a single space ' +
   'or "-". Optionally, it can start with "+".'

const capitalize = (text) => text[0].toUpperCase() + text.slice(1);

const normalizeName = (name) => name.trim().toLowerCase()

const prettifyName = (name) => (
   name.trim()
      .split(/\s+/)
      .map(capitalize)
      .join(' ')
)

const checkMinLength = (field, value, minLen) => {
   if (value.length < minLen)
      throw new Error(`Too short! The ${field} must be at least ${minLen} characters long`)
}

const checkMaxLength = (field, value, maxLen) => {
   if (value.length > maxLen)
      throw new Error(`Too long! The ${field} must be at most ${maxLen} characters long`)
}

const findContactByName = (name, contacts) => {
   name = normalizeName(name);
   return contacts.find(contact => normalizeName(contact.name) === name)
}

const checkNameDoesNotExist = (name, contacts) => {
   if (findContactByName(name, contacts))
      throw new Error('This name already exists in the phonebook!')
}

const validateName = (name, contacts, { exists_okay = true, isPartial = false } = {}) => {
   name = normalizeName(name)
   try {
      if (!isPartial)
         checkMinLength('name', name, 3)
      checkMaxLength('name', name, 30)

      if (!exists_okay)  // currently unused
         checkNameDoesNotExist(name, contacts)
   }
   catch (err) {
      return err.message
   }
}

const countDigits = (str) => {
   return str.replace(/\D/g, '').length
}

const validatePhoneNumber = (phone, { isPartial = false } = {}) => {
   const field = 'phone number'
   phone = phone.trim();
   try {
      checkMaxLength(field, phone, 20)
      if (isPartial) {
         if (!phone.match(/^[+]?([0-9]+[- ]?)*$/))
            return PHONE_FIELD_INSTRUCTIONs;
      }
      else {
         if (countDigits(phone) < 8)
            return 'Too short! Must contain at least 8 digits!'
         if (!phone.match(/^[+]?[0-9]+([ -][0-9]+)*$/))
            return PHONE_FIELD_INSTRUCTIONs
      }
   }
   catch (err) {
      return err.message
   }
}

const InputFormField = ({ type, label, id, value, onChange, error, inputRef, ...props }) => (
   <div className="FormField">
      <label htmlFor={id} className="FormField__label">{label}:</label>
      <input
         ref={inputRef}
         className={(error) ? "in-error" : undefined}
         id={id}
         type={type}
         value={value}
         onChange={onChange}
         {...props}
      />
      {error && <div className="FormField__error">{error}</div>}
   </div>
)

export default function ContactForm({ contacts, onAddNew, onUpdate }) {
   const [name, setName] = useState('')
   const [nameError, setNameError] = useState('')
   const [phone, setPhone] = useState('')
   const [phoneError, setPhoneError] = useState('')
   const [nameInput, setNameInput] = useState(null)
   const [existingContact, setExistingContact] = useState(null)

   useEffect(() => {
      let contact = findContactByName(name, contacts)
      setExistingContact(contact)
   }, [name, contacts])

   const updateName = (event) => {
      let newName = event.target.value
      let error = validateName(newName, contacts, { isPartial: true })
      setNameError(error)
      setName(newName)
   }

   const updatePhone = (event) => {
      let newNumber = event.target.value
      let error = validatePhoneNumber(newNumber, { isPartial: true })
      setPhoneError(error)
      setPhone(newNumber)
   }

   const submit = (event) => {
      event.preventDefault()
      let nameErr = validateName(name, contacts)
      let phoneErr = validatePhoneNumber(phone, contacts)
      if (nameErr || phoneErr) {
         setNameError(nameErr)
         setPhoneError(phoneErr)
      }
      else {
         if (existingContact && (phone !== existingContact.phoneNumber)) {
            onUpdate({ ...existingContact, phoneNumber: phone })
         }
         else {
            onAddNew({
               name: prettifyName(name),
               phoneNumber: phone.trim()
            })
         }
         setName('')
         setPhone('')
         nameInput.focus();
      }
   }

   const disabled = !name || !phone || nameError || phoneError;

   return (
      <form className="ContactForm">
         <InputFormField
            inputRef={setNameInput}
            label="Name"
            id="name-field"
            value={name}
            error={nameError}
            onChange={updateName}
         />
         <InputFormField
            label="Phone number"
            id="phone-field"
            value={phone}
            error={phoneError}
            onChange={updatePhone}
         />
         <button
            type="submit"
            onClick={submit}
            disabled={disabled}
            className={existingContact ? "ContactForm__update-btn" : undefined}
         >
            {existingContact ? "Update contact" : "Add new contact"}
         </button>
      </form>
   )
}

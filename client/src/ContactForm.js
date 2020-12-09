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

const findContactByName = (name, contacts) => {
   name = normalizeName(name);
   return contacts.find(contact => normalizeName(contact.name) === name)
}

const validatePartialPhoneNumber = (partialPhone) => {
   partialPhone = partialPhone.trim();
   if (!partialPhone)
      return ''
   if (!partialPhone.match(/^[+]?([0-9]+[- ]?)*$/))
      return PHONE_FIELD_INSTRUCTIONs;
   return '';
}

const validateName = (name, contacts, isNewName) => {
   name = normalizeName(name)
   if (!name)
      return 'Empty name!'
   if (isNewName && findContactByName(name, contacts))
      return 'This name already exists in the phonebook!'
   return '';
}

const validatePhoneNumber = (phone) => {
   phone = phone.trim();
   if (!phone)
      return 'Empty phone number!'
   if (!phone.match(/^[+]?[0-9]+([ -][0-9]+)*$/))
      return PHONE_FIELD_INSTRUCTIONs
   return '';
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
      setName(newName)
   }

   const updatePhone = (event) => {
      let newNumber = event.target.value
      let error = validatePartialPhoneNumber(newNumber.trim())
      setPhoneError(error)
      setPhone(newNumber)
   }

   const submit = (event) => {
      event.preventDefault()
      let nameErr = validateName(name, contacts, !existingContact)
      let phoneErr = validatePhoneNumber(phone.trim(), contacts)
      if (nameErr || phoneErr) {
         setNameError(nameErr)
         setPhoneError(phoneErr)
      }
      else {
         if (existingContact) {
            if (phone !== existingContact.phoneNumber)
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

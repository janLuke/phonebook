import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as api from './api'

import ContactForm from './ContactForm'
import ContactListWithFilter from './ContactListWithFilter'
import { replaceElem } from './util';


/**
 * WARNING: mutate the Array in-place!
 */
function sortByName(contacts) {
   return contacts.sort((a, b) => a.name.localeCompare(b.name))
}

function isServerSideError(err) {
   return err.response && err.response.data;
}

function getErrorMessage(err) {
   if (isServerSideError(err)) {
      let data = err.response.data;
      if (data.message) 
         return data.message;
      if (data.errors && data.errors.length > 0)
         return data.errors[0].message;
   }
   return err.message
}

export default function App() {
   const [state, setState] = useState("loading")
   const [contacts, setContacts] = useState([])
   const [error, setError] = useState(null)

   const fetchAllContacts = () => {
      api.getAllContacts()
         .then(contactList => {
            setContacts(sortByName(contactList))
            setState("ready")
         })
         .catch(err => {
            setState("error")
            setError(
               "Error while trying to fetch data from the server.\n" +
               `Details: ${err.message}`)
         })
   }

   const addNewContact = async (newContactData) => {
      api.addContact(newContactData)
         .then(newContact => {
            let updatedContactList = [...contacts, newContact]
            setContacts(sortByName(updatedContactList))
            toast.success(
               `${newContact.name} was saved`,
               { autoClose: 3000 }
            )
         })
         .catch(err => {
            console.error(err)
            let message = getErrorMessage(err)
            toast.error(`Failed to add "${newContactData.name}". Details:  ${message}`)
         })
   }

   const updateContact = (modified) => {
      api.updateContact(modified)
         .then(updated => {
            console.log(updated);
            let index = contacts.findIndex(c => c.id === modified.id)
            let newContacts = replaceElem(contacts, index, updated)
            setContacts(sortByName(newContacts))
            toast.success(
               `The number of "${updated.name}" was successfully updated.`)
         })
         .catch(err => {
            console.error(err)
            toast.error(
               `Failed to update "${modified.name}". Details: ${getErrorMessage(err)}`)
         })
   }

   const deleteContact = (id) => {
      let deleted = contacts.find(c => c.id === id);
      api.deleteContact(id)
         .then(resp => {
            setContacts(contacts.filter(c => c.id !== id))  // preserve sorting
            toast.success(`"${deleted.name}" was successfully deleted.`)
         })
         .catch(err => {
            console.log(err)
            let msg;
            if (err.response && err.response.status === 404) {
               fetchAllContacts()
               msg = `It seems "${deleted.name}" had already been deleted.` +
                  " You were using a stale tab, but now you're okay!"
            }
            else {
               let details = getErrorMessage(err);
               msg = `Failed to delete "${deleted.name}". Details: ${details}`
            }
            toast.error(msg)
         })
   }

   useEffect(fetchAllContacts, [])

   let content = null;
   if (state === 'ready') {
      content = (
         <>
            <Panel className="add-item-panel">
               <ContactForm
                  contacts={contacts}
                  onAddNew={addNewContact}
                  onUpdate={updateContact}
               />
            </Panel>
            <Panel className="contact-list-panel">
               <ContactListWithFilter
                  contacts={contacts}
                  onDelete={deleteContact}
               />
            </Panel>
         </>
      )
   }
   else if (state === 'loading') {
      content = null   // FIXME: put a spinner here
   }
   else if (state === 'error') {
      content = <p style={{ color: 'red' }}>{error}</p>
   }
   else
      throw new Error('invalid state');

   return (
      <div className="App">
         <ToastContainer />
         <h1 className="header">PhoneBook</h1>
         <div className="content">
            {content}
         </div>
      </div >
   )
}

const Panel = ({ className, children }) => {
   let classes = 'Panel' + (' ' + className || '')
   return (
      <div className={classes}>
         {children}
      </div>
   )
}
import React, { useState, memo } from 'react'
import { FaTrash } from 'react-icons/fa'

/**
 * Partition the string into three parts using the given separator.
 * This will search for the separator in the string. If the separator is found
 * returns a 3-Array containing the part before the separator, the part matching
 * the separator (with the original case), and the part after it.
 * 
 * The match of the separator is case-insensitive if [caseInsensitive] is true.
 * 
 * Inspired by Python str.partition.
 */
function partitionString(text, sep, caseInsensitive = false) {
   let i;
   if (caseInsensitive) {
      let lowerText = text.toLowerCase();
      let lowerSubstr = sep.toLowerCase();
      i = lowerText.indexOf(lowerSubstr);
   }
   else {
      i = text.indexOf(sep);
   }
   if (i < 0)
      return [text, '', '']
   let j = i + sep.length;
   return [text.slice(0, i), text.slice(i, j), text.slice(i + sep.length)]
}

function mergeClasses(...cls) {
   return cls.filter(c => c != null).join(' ')
}

const IconButton = ({ children, className, ...props }) => (
   <button className={mergeClasses("IconButton", className)} {...props}>
      {children}
   </button>
)

const ContactItem = memo(({ contact, nameFilter, onDelete }) => {

   const confirmDeletion = () => {
      if (window.confirm(`Do you really want to delete ${contact.name}?`))
         onDelete(contact.id)
   }

   // Highlight the query (if present)
   const [prefix, toHighlight, postfix] =
      partitionString(contact.name, nameFilter, true)

   const nameElem = (toHighlight)
      ? <span>{prefix}<strong>{toHighlight}</strong>{postfix}</span>
      : contact.name;

   return (
      <li
         className="ContactItem"
         key={contact.name}
      >
         <div className="ContactItem__info">
            <div className="ContactItem__name">
               {nameElem}
            </div>
            <div className="ContactItem__phone">
               {contact.phoneNumber}
            </div>
         </div>

         <div className="ContactItem__buttons">
            <IconButton className="IconButton--red" onClick={confirmDeletion}>
               <FaTrash />
            </IconButton>
         </div>
      </li>
   )
})

function filterContactsByName(contacts, filter) {
   let normalizedFilter = filter.toLowerCase();
   return contacts.filter(c => (
      c.name.toLowerCase().includes(normalizedFilter)
   ))
}

const ContactList = memo(({ contacts, nameFilter, onDelete }) => {
   let results = filterContactsByName(contacts, nameFilter);
   if (results.length === 0) {
      return (
         <p className="ContactList--empty">
            {nameFilter
               ? "No matches"
               : "The contact list is empty."}
         </p>
      )
   }

   return (
      <ul className="ContactList">
         {results.map(contact => (
            <ContactItem
               key={contact.name}
               contact={contact}
               nameFilter={nameFilter}
               onDelete={onDelete}
            />
         ))}
      </ul>
   )
})

export default function ContactListWithFilter({ contacts, onDelete }) {
   const [filter, setFilter] = useState('')

   const onFilterChange = (event) => {
      let newFilter = event.target.value;
      setFilter(newFilter)
   }

   return (
      <div className="ContactListWithFilter">
         <div className="ContactListWithFilter__header">
            <input
               type="text"
               value={filter}
               placeholder="Filter by name..."
               onChange={onFilterChange} />
         </div>
         <ContactList
            contacts={contacts}
            nameFilter={filter}
            onDelete={onDelete}
         />
      </div>
   )
}
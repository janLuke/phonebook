import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts'


export function getAllContacts() {
   return axios.get(baseUrl).then(resp => resp.data)
}

export function addContact(contact) {
   return axios.post(baseUrl, contact)
      .then(resp => resp.data)
}

export function deleteContact(id) {
   return axios.delete(`${baseUrl}/${id}`)
}

export function updateContact(contact) {
   return axios.put(`${baseUrl}/${contact.id}`, contact)
      .then(resp => resp.data)
}
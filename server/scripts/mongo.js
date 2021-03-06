/*
 * CLI to interact with the phonebook MongoDB database.
 */


const mongoose = require('mongoose')

const CLI_USAGE = 'Usage: node mongo.js <password> [<name> <phone-number>]\n'
const DB_NAME = 'phonebook-db'

function getDatabaseURI(db_name, password) {
   return `mongodb+srv://janluke:${password}@cluster0.hxbs9.mongodb.net/${db_name}?retryWrites=true&w=majority`
}

const Contact = mongoose.model('Contact', new mongoose.Schema({
   name: String,
   phoneNumber: String,
}))

function parseArgs(argv) {
   const args = argv.slice(2)

   if (args.length == 0) {
      throw 'Error: the password argument is required'
   }
   if (args.length != 1 && args.length != 3) {
      throw 'Error: wrong number of arguments'
   }

   let password = args[0]
   let contactData = null
   if (args.length == 3) {
      contactData = { name: args[1], phoneNumber: args[2] }
   }
   return { password, contactData }
}

async function saveContact(contactData) {
   const contact = new Contact(contactData)
   await contact.save()
   console.log('Contact successfully saved!')
}

async function showContactList() {
   let contactList = await Contact.find({})
   console.log('\nPhonebook:')
   if (contactList.length === 0)
      console.log('* No contacts saved.')
   else {
      for (contact of contactList)
         console.log(`* ${contact.name}, ${contact.phoneNumber}`)
   }
}

async function main() {
   // Parse CLI arguments
   try {
      args = parseArgs(process.argv)
   } catch (err) {
      console.log(CLI_USAGE)
      console.log(err)
      process.exit(1)
   }
   const { password, contactData } = args;

   // Connect to the database
   const db_uri = getDatabaseURI(DB_NAME, password)
   try {
      await mongoose.connect(db_uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true,
      })
      console.log('Successfully connected to database!')
   }
   catch (err) {
      console.log(err.toString())
      process.exit(1)
   }

   try {
      if (contactData != null)
         await saveContact(contactData)
      else
         await showContactList();
   }
   catch (err) {
      console.log('Error: ' + err)
   }

   mongoose.connection.close()
}


main()
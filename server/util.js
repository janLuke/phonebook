
function parseId(rawId) {
   const id = parseInt(rawId)
   const error = (isNaN(id)) ? 'the <id> parameter should be an integer' : null
   return [id, error]
}

function forbidden(resp, error) {
   resp.status(403).json({ error })
}

function badRequest(resp, error) {
   return resp.status(400).json({ error })
}

// FIXME: this is shit, but it's what the exercise requires
function generateId() {
   return Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
}

// FIXME: this is duplicated in client and server
function validatePhoneNumber(phone) {
   if (!phone)
      return 'Empty phone number'
   if (!phone.match(/^[+]?[0-9]+([ -][0-9]+)*$/))
      return 'A phone number can only contain digits separated by a single ' +
         'space or "-". Optionally, it can start with "+".'
   return '';
}

module.exports = {
   parseId,
   forbidden,
   badRequest,
   generateId,
   validatePhoneNumber,
}
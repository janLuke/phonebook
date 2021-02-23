
function httpError(status) {
   return (resp, message) => resp.status(status).json({ error: message })
}

const forbidden = httpError(403)

// FIXME: this is shit of course
function generateContactId() {
   return Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
}

module.exports = {
   forbidden,
   generateContactId,
}
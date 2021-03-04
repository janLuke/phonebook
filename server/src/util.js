
function httpError(status) {
   return (resp, message) => resp.status(status).json({ error: message })
}

const forbidden = httpError(403)

module.exports = {
   forbidden
}
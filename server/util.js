
function parseId(rawId) {
   const id = parseInt(rawId)
   const error = (isNaN(id)) ? 'the <id> parameter should be an integer' : null
   return [id, error]
}


function badRequest(res, error) {
   return res.status(400).json({ error })
}


module.exports = {
   parseId,
   badRequest
}
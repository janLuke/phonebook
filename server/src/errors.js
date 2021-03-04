
class NotFound extends Error {
    constructor(msg) {
        super(msg || 'not found')
        this.name = 'NotFound'
        this.status = 404
    }
}

class ResourceNotFound extends NotFound {
    constructor(id, type) {
        super(`no ${type} with id ${id} was found`)
        this.name = 'ResourceNotFound'
    }
}


class BadRequest extends Error {
    constructor(msg) {
        super(msg || 'bad request')
        this.name = 'BadRequest'
        this.status = 400
    }
}

module.exports = {
    NotFound,
    BadRequest,
    ResourceNotFound,
}

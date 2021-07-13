module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }

        
    function notExistsOrError(value, msg) { // Se não existir: Ok. Se existir: Error
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return 
        }
        throw msg
    } 

    return { existsOrError, notExistsOrError }
}
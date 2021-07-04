module.exports = app => {
    const signIn = async (req, res) => {
        return res.status(202).send()
    }

    const validateToken = async (req, res) => {
        return res.status(202).send()
    }

    return { signIn, validateToken }
}
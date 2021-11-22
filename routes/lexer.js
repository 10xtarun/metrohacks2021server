const { applyLexer } = require('../controller/lexer')

const Router = require('express').Router()

Router.post('/lexer', (req, res, next) => {
    const count = applyLexer(req.body.sms)
    if (count.error) {
        return res.status(422).json({
            success: false,
            count: 0
        })
    }
    return res.status(200).json({
        success: true,
        count: count.data
    })
})

module.exports = Router
const express = require('express')
const cors = require('cors')
const Router = require('./routes/lexer')
const app = express()
const port = 3000

app.use(cors({
    origin: "*"
}))

app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => res.send('Hello World!'))
app.use('/sms', Router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
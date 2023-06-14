const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session')
const FileSore = require('session-file-store')(session)

let app = express()

app.use(session({
    secret : '123123123',
    resave : false,
    saveUninitialized : true,
    store : new FileSore(),
}))

app.get('/', (req, res, next) => {
    console.log(req.session)

    if(req.session.num === undefined) {
        req.session.num = 1
    } else {
        req.session.num = req.session.num + 1
    }
    res.send(`Views : ${req.session.num}`)
})

app.listen(3000, () => {
    console.log('Server is running port 3000!')
})

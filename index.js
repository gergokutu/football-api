// importing express
const express = require('express')
// for testing purpose
// const db = require('./db')
// const Team = require('./team/model')
const teamRouter = require('./team/router')

// 'instantiating' express
const app = express()
// configuring the port (we might get one if we are putting our app online)
const port = process.env.PORT || 4000
// import parser
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(teamRouter)

// Pass the port to app.listen to start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
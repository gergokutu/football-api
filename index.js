const express = require('express')
// 'instantiating' express
const app = express()
// configuring the port (we might get one if we are putting our app online)
const port = process.env.PORT || 4000

// Pass the port to app.listen to start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
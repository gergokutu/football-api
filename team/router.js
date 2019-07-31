const {Router} = require('express')
const Team = require('./model')

const router = new Router()

router.get(
  '/team',
  (request, response, next) => {
    Team.findAll()
    .then(listOfTeams => {
      response.send(listOfTeams)
    })
    .catch(error => next(error))
  }
)

module.exports = router
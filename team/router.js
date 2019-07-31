const { Router } = require('express')
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
// register a POST endpoint
// test it after implementing body-parser » install...
// ...implement in top-level index.js
// test it » http :4000/team name="yeeeeahh"
// also works » http PUT :4000/team name="yeeeeahh"
router.post(
  '/team',
  (request, response, next) => {
    Team.create(request.body)
      .then(team => {
        response.send(team)
      })
      .catch(error => next(error))
  }
)
      



module.exports = router
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
    Team
    // findOne » have to find 1 where the name is...
    // the request.body.name
    // then » if it exists (true) » do not do anything...
    // just send a status code and answer
      .findOne({ where: { name: request.body.name }})
      .then(team => {
        if (team) {
          // proper order to send both http status code and a message
          response.status(403).send("Name already used.",)
        } else {
          // returning Team here to not to use catch 2x
          return Team
            .create(request.body)
            .then(team => response.send(team))
            // next catch is not necessary
            // .catch(error => next(error))
        }
      })
      .catch(next)
  }
)

router.get(
  '/team/:id',
  (request, response, next) => {
    Team.findByPk(request.params.id)
      .then(team => response.send(team))
      .catch(error => next(error))
  }
)

router.put(
  '/team/:id',
  (request, response, next) => {
    Team
      .findByPk(request.params.id)
      .then(team => {
        if (team) {
          return team.update(request.body)
            .then(team => response.send(team))
        }
        return response.status(404).end()
      })
      .catch(error => next(error))
  }
)
      
router.delete(
  '/team/:id',
  (request, response, next) => {
    Team
      .destroy({
        where: {
          id: request.params.id
        }
      })
      .then(number => response.send({ number }))
      .catch(next)
  }
)

module.exports = router
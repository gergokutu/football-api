// this has to be at the start of the file...
// const Team = require('../team/model')
const Team = require('../team/model')
const { Router } = require('express')
const Player = require('./model')
// const Op = require("sequelize").Op

const router = new Router()

router.get(
  '/player',
  (request, response, next) => {
    Player.findAll()
      .then(listOfPlayers => {
        response.send(listOfPlayers)
      })
      .catch(error => next(error))
  }
)
// register a POST endpoint
// test it after implementing body-parser » install...
// ...implement in top-level index.js
// test it » http :4000/player name="yeeeeahh"
// also works » http PUT :4000/player name="yeeeeahh"
router.post(
  '/player',
  (request, response, next) => {
    Player
    // findOne » have to find 1 where the name is...
    // the request.body.name
    // then » if it exists (true) » do not do anything...
    // just send a status code and answer
      .findOne({
        where: {
          // check the sequelize operators and their usage...
          // also have to import »
          // const Op = require("sequelize").Op on the top!!!
          // but you do not have to import anything if you use...
          // [Sequelize.Op.or] instead of [Op.or]
          [Sequelize.Op.or]: [{ name: request.body.name }, { number: request.body.number }]
        }
      })
      .then(player => {
        if (player) {
          // proper order to send both http status code and a message
          response.status(403).send("Name and/or number already used.",)
        } else {
          // returning Player here to not to use catch 2x
          return Player
            .create(request.body)
            .then(player => response.send(player))
            // next catch is not necessary
            // .catch(error => next(error))
        }
      })
      .catch(next)
  }
)

router.get(
  '/player/:id',
  (request, response, next) => {
    Player.findByPk(request.params.id, { include: [Team] })
      .then(player => response.send(player))
      .catch(error => next(error))
  }
)

router.put(
  '/player/:id',
  (request, response, next) => {
    Player
      .findByPk(request.params.id)
      .then(player => {
        if (player) {
          return player.update(request.body)
            .then(playerToUpdate => response.send(playerToUpdate))
        }
        return response.status(404).end()
      })
      .catch(error => next(error))
  }
)
      
router.delete(
  '/player/:id',
  (request, response, next) => {
    Player
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
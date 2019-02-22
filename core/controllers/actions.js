/**
 * Router for handling common actions in OCTAPUS API
 *
 * @param config
 * @param app
 * @param express
 */
function actions(config, app, express) {
  // The Router
  const actionRouter = express.Router()

  // Models
  const ActionsModel = require('../models/ActionsModel')
  const actions = new ActionsModel(config)

  actionRouter
    .route('/test')
    .get((rq, rs) => {
        rs.send({
          error: false,
          message: 'This is a test response'
        })
      })

  return actionRouter
}
module.exports = actions
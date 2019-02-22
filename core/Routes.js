/**
 * Route handler to add routes to the main App
 */

// Routes Controller
const Routes = class {
  constructor(config, app, express) {
    this.config = config
    this.app = app
    this.express = express

    // Connect our controllers with Routes
    this.actionsController = require('./controllers/actions')(config, app, express)
  }

  init() {

    // Routes Init
    this.app.use('/actions', this.actionsController)
    
  }
};

module.exports = Routes
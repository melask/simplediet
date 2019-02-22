const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const compression = require('compression')

// Routes
const Routes = require('./routes');

const Server = class {
  constructor() {
    this.config = {}
  }


  init() {
    this.config = require('./config');

    // Use Compression
    app.use(compression({level:4}));
    // POST JSON Parser
    app.use(bodyParser.urlencoded({limit:'850mb', extended: true}));
    app.use(bodyParser.json({'limit': '850mb'}));

    // CORS Permissions
    const whitelistCors = [
      undefined,
      // 'http://localhost:4000',
    ];
    const corsOptions = {
      origin: function (origin, callback) {
        if (whitelistCors.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          console.log('Origin forbidden access:', origin);
          callback(null, false);
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],	
      credentials: true,
      exposedHeaders: [''],
      allowedHeaders: ['Content-Type']
    };

    app.use(cors(corsOptions));

    // Routes
    const routeSystem = new Routes(this.config, app, express);
    routeSystem.init();
    console.log('Routes mounted!');

    // Init server
    app.listen(this.config.port, () => console.log(`Server listening on port ${this.config.port}!`));
  
  }

};

module.exports = Server;
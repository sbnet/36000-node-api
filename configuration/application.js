var convict = require('convict');

// Define a schema
var conf = convict({
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development"],
    default: "development",
    env: "NODE_ENV"
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 0,
    env: "PORT"
  },
  url: {
    doc: "The api url.",
    format: "url",
    default: "http://localhost:3000",
    env: "URL"
  },
});

// Load environment dependent configuration
var env = conf.get('env');
conf.loadFile('./configuration/' + env + '.json');

// Perform validation
conf.validate({allowed: 'strict'});

module.exports = conf;
/**
 * Development environment settings
 *
 */

const config  = require('smallfish_config').development;

const extend = {

  port: 1343

};

module.exports = Object.assign({}, config, extend);
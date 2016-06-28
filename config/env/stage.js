/**
 * Stage environment settings
 *
 */

const config  = require('smallfish_config').stage;

const extend = {
    models: {
        connection: 'smallfish_auth_stage',
        migrate: 'safe'
    },

    port: 1343
};
module.exports = Object.assign({}, config, extend);
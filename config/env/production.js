/**
 * Production environment settings
 */

const config  = require('smallfish_config').production;

const extend = {

    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    models: {
        connection: 'smallfish_auth',
        migrate: 'safe'
    },

    port: 1343
};
module.exports = Object.assign({}, config, extend);
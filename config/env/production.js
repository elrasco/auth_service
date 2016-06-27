/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

const SF_AUTH_HOST_IP = 'internal-marketplace.lb.smallfish.com';
const SF_MAIL_HOST_IP = 'internal-marketplace.lb.smallfish.com';
const SF_API_HOST_IP = 'internal-marketplace.lb.smallfish.com';
const MP_ACCOUNTING_HOST_IP = 'internal-marketplace.lb.smallfish.com';
const MP_API_HOST_IP = 'internal-marketplace.lb.smallfish.com';
const MP_BE_HOST_IP        = 'marketplace.lb.smallfish.com';
const MP_SOCKET_HOST_IP    = 'marketplace.lb.smallfish.com';

module.exports = {

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

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
 const SF_UPLOAD_HOST_IP = process.env.SF_UPLOAD_HOST_IP;
 const SF_AUTH_HOST_IP = process.env.SF_AUTH_HOST_IP;
 const SF_MAIL_HOST_IP = process.env.SF_MAIL_HOST_IP;
 const SF_API_HOST_IP = process.env.SF_API_HOST_IP;
 const MP_BE_HOST_IP = process.env.MP_BE_HOST_IP;
 const MP_ACCOUNTING_HOST_IP = process.env.MP_ACCOUNTING_HOST_IP;
 const MP_API_HOST_IP = process.env.MP_API_HOST_IP;
 const MP_SOCKET_HOST_IP = process.env.MP_SOCKET_HOST_IP;

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    models: {
        connection: 'smallfish_auth_stage',
        migrate: 'safe'
    },

    port: 1339,

    /***************************************************************************
     * Set the port in the production environment to 80                        *
     ***************************************************************************/

    // port: 80,

    /***************************************************************************
     * Set the log level in production environment to "silent"                 *
     ***************************************************************************/

    log: {
        level: "silent"
    }

};

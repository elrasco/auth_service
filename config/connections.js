/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  *                                                                          *
  * MySQL is the world's most popular relational database.                   *
  * http://en.wikipedia.org/wiki/MySQL                                       *
  *                                                                          *
  * Run: npm install sails-mysql                                             *
  *                                                                          *
  ***************************************************************************/
  /*
  smallfish_auth: {
    adapter: 'sails-mysql',
    host: 'smallfish-test.cj2ft7z1f8mt.us-west-2.rds.amazonaws.com',
    user: 'smallfish_test',
    password: 'smallfish_test01!',
    database: 'smallfish_auth',
    connectTimeout: 10000,
    connectionLimit: 20
  },
  */
  smallfish_auth_test: {
    user: 'smallfish_test',
    password: 'smallfish_test01!',
    database: 'smallfish_auth',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 1,
      idle: 10000
    },
    options: {
      dialect: 'mysql',
      host: 'smallfish-test.cj2ft7z1f8mt.us-west-2.rds.amazonaws.com',
      logging: true
    }
  },

  smallfish_auth: {
    user: 'smallfish_prod',
    password: 'smallfish_prod01!',
    database: 'smallfish_auth',
    dialect: 'mysql',
    pool: {
      max: 15,
      min: 5,
      idle: 10000
    },
    options: {
      dialect: 'mysql',
      host: 'asw-smallfish-prod.cuoyjpk3vtj2.eu-central-1.rds.amazonaws.com',
      logging: true
    }
  }

};

/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  cb();

  const http = require('http');
  const req = http.IncomingMessage.prototype;

  /**
   * Test if request is authenticated.
   *
   * @return {Boolean}
   * @api public
   */
  req.isAuthenticated = function() {
    let token;
    if (this.headers && this.headers.authorization) {
      let parts = this.headers.authorization.split(' ');
      if (parts.length == 2) {
        let scheme = parts[0];
        let credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
    // Now i have the jwt token
    try {
      //  first try as a service
      this.user = jwToken('service').verify(token);
      return true;
    } catch (ex) {
      try {
        //  second try as a user
        this.user = jwToken('admin').verify(token);
        return true;
      } catch (ex) {
        // create a nice error
        let error = { error: ex.name, message: ex.message }
        try {
          Object.assign(error, {
            decoded: jwToken('service').decode(token)
          })
        } catch (e) {}

        throw error;
      }
    }
  };

};

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

  var http = require('http'),
    req = http.IncomingMessage.prototype;

  /**
   * Test if request is authenticated.
   *
   * @return {Boolean}
   * @api public
   */
  req.isAuthenticated = function() {

    var token;
    if (this.headers && this.headers.authorization) {
      var parts = this.headers.authorization.split(' ');
      if (parts.length == 2) {
        var scheme = parts[0],
          credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
    try {
      this.user = jwToken('service')
        .verify(token);
      return true;
    } catch (ex) {
      try {
        this.user = jwToken('user')
          .verify(token);
        return true;
      } catch (ex) {
        return false;
      }
    }
  };

};

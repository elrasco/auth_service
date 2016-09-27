/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var passport = require('passport');

module.exports = {


  isValidToken: function(req, res) {

    var type = !req.body.type ? 'user' : req.body.type;
    var auth = true;

    try {
      jwToken(type).verify(req.body.token);
    } catch (ex) {
      auth = false;
    }

    res.json({
      auth: auth
    });

  },

  isAuthenticated: function(req, res) {
    res.json({
      auth: req.isAuthenticated()
    });
  },

  login: function(req, res) {

    if (!req.body) {
      res.status(400).send({
        code: 400,
        message: 'Missing datas'
      });
    } else {

      var type = !req.body.type ? 'service' : req.body.type;

      var email_empty = !req.body.email || req.body.email === '';
      var password_empty = !req.body.password || req.body.password === '';

      if (email_empty || password_empty) {
        res.status(400).send({
          code: 400,
          message: 'Missing datas'
        });
      } else {

        User.findOne({
          where: {
            email: req.body.email,
            enable: true
          },
          attributes: {
            exclude: ['updatedAt', 'createdAt']
          },
          include: [{
            model: User_roles,
            as: 'roles',
            attributes: {
              exclude: ['updatedAt', 'createdAt', 'user_id', 'id']
            }
          }]
        }).then(function(user) {
          if (user) {
            user.comparePassword(req.body.password, function(u, msg) {
              if (u) {
                user.roles = user.roles.map(function(role) {
                  return role.role;
                });
                var _user = Object.assign({}, user.dataValues, {
                  roles: user.roles
                }, {
                  extra: req.body.extra
                });
                delete _user.password;

                return res.send({
                  token: jwToken(type).issue(_user)
                });
              } else {
                res.status(401).send({
                  code: 401,
                  message: 'Invalid username/password'
                });
              }
            });
          } else {
            res.status(401).send({
              code: 401,
              message: 'Invalid username/password'
            });
          }
        }, function(err) {
          throw err;
        });
      }
    }
  },

  issue: function(req, res) {
    try {
      const token = jwToken(req.params.type).issue(req.body);
      return res.send({
        token: jwToken(req.params.type).issue(req.body),
        payload: req.body
      });
    } catch (err) {
      return res.serverError(err);
    }
  }

};

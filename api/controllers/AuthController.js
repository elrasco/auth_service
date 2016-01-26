/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var passport = require('passport');

module.exports = {

    isAuthenticated: function(req, res) {
      res.json(
        {
          auth: req.isAuthenticated()
        }
      );
    },

    login: function(req, res) {
 
      if(!req.body){
        res.status(403).send('Missing datas');
      }
      else{
        
        var type = !req.body.type? 'service':req.body.type;

        var email_empty = !req.body.email || req.body.email == '';
        var password_empty = !req.body.password || req.body.password == '';

        if(email_empty || password_empty){
          res.status(403).send('Missing datas');
        }
        else{

          User.findOne(
            {
              email: req.body.email,
              enable: true
            }
          )
          .exec(function(err, user) {

            if (err) {
              throw err;
            }
            if (user) {
              user.comparePassword(req.body.password, function(u, msg) {
                if (u) {

                  return res.send({
                    token: jwToken(type).issue(
                      {
                        user_id: user.id
                      }
                    )
                  });
                }
                else{
                  res.status(403).send('Missing user');
                }
              });
            } else {
              res.status(401).send('Invalid password');
            }
          });

        }
        
      }
      
    }
};
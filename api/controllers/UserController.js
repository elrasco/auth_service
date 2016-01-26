/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	create: function(req,res){

		if(!req.body.password){
			req.body.password = Functions.generateRandomString();
		}

		User
		.create(req.body)
		.then(
			function(response){
				res.send(response);
			},
			function(error){
				res.serverError(error);
			}

		);

	}


};


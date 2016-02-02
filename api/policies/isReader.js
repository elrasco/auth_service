module.exports = function (req, res, next) {

	if (req.user) {
		User_roles
		.findOne(
			{
				user_id: req.user.id,
				role: 'reader'
			}
		)
		.then(function(role) {
			if (role) {
				console.log('im reader');
				next();
			} else {
				res.forbidden('You are not permitted to perform this action.');
			}
		});
	} else {
		res.serverError();	
	}

}
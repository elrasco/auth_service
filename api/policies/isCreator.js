module.exports = function (req, res, next) {

	if (req.user) {
		User_roles
		.findOne(
			{
				user_id: req.user.id,
				role: 'creator'
			}
		)
		.then(function(role) {
			if (role) {
				next();
			} else {
				res.forbidden('You are not permitted to perform this action.');
			}
		});
	} else {
		next(res.forbidden());	
	}

}
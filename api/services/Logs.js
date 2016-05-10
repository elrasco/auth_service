module.exports = {
	auth: function() {
		var args = Array.prototype.slice.call(arguments);
		sails.log.info.call(this, ('Auth :: ').cyan, args.join(' '));
	},
	socket: function() {
		var args = Array.prototype.slice.call(arguments);
		sails.log.info.call(this, ('Socket :: ').yellow, args.join(' '));
	},
	http: function() {
		var args = Array.prototype.slice.call(arguments);
		sails.log.info.call(this, ('HTTP :: ').grey, args.join(' '));
	},
	JSON: function(logFunction) {
		var args = Array.prototype.slice.call(arguments, 1);
		args.map((o) => {
			JSON.stringify(o, null, ' ')
				.split("\n")
				.forEach((line) => {
					logFunction(line);
				});
		});
	}
};
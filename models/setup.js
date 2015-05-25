var config = require("./config");
var Waterline = require("waterline");
var Q = require("q");

module.exports = (function WaterlineSetup() {
	var adapters = {
		'sails-mysql': require('sails-mysql')
	};
	var connections = config.connections;
	var waterline = new Waterline();

	var def = Q.defer();

	waterline.loadCollection(require("./entityA"));
	waterline.loadCollection(require("./entityB"));

	waterline.initialize({
		adapters: adapters,
		connections: connections,
	}, function (err, models) {
		if (err)
			def.reject(err);
		else
			def.resolve(models);
	});

	return def.promise;

})();

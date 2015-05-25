module.exports.connections = {
	dbA: {
		adapter: 'sails-mysql',
		host: '127.0.0.1',
		port: 3306,
		database: 'testA'
	},
	dbB: {
		adapter: 'sails-mysql',
		host: '127.0.0.1',
		port: 3306,
		database: 'testB'
	}
};
module.exports.connectionA = "dbA";
module.exports.connectionB = "dbB";

/**
 * Created by Phoenix on 4/19/2015.
 */

"use strict";

var Waterline = require("waterline");
var config = require("./config");

module.exports = Waterline.Collection.extend({
	identity: "A",
	connection: config.connectionA,
	tableName: "entityA",
	attributes: {
		id: {
			type: "integer",
			required: true,
			autoIncrement: true,
			primaryKey: true
		},
		B: {
			model: "B",
			columnName: "b_id"
		}
	}
});
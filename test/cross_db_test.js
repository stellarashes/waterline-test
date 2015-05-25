/**
 * Created by Phoenix on 5/25/2015.
 */
var mocha = require("mocha");
var chai = require("chai");
var expect = chai.expect;
var waterline = require('../models/setup');
var async = require('async-q');
var util = require("util");


describe("Cross-database association/population", function () {
	it("should be able to set up data", function (done) {
		waterline.then(function (models) {
			var A = models.collections.a;
			var B = models.collections.b;
			var tasks = [
				function () {
					return A.destroy({});
				},
				function () {
					return B.destroy({});
				},
				function () {
					return B.create({}).then(function (b) {
						return A.create({B: b}).then(function (a) {
							expect(a).to.not.be.null;
							done();
						});
					});
				}
			];

			async.series(tasks)
				.catch(console.error);
		});
	});

	it("should be able to populate B", function (done) {
		waterline.then(function (models) {
			var A = models.collections.a;
			var B = models.collections.b;

			A.find().limit(1).populate('B').then(function (foundA) {
				expect(foundA).to.not.be.empty;
				expect(foundA[0].B).to.not.be.empty;
				done();
			})
		});
	});

	it("should be able to find by B", function (done) {
		waterline.then(function (models) {
			var A = models.collections.a;
			var B = models.collections.b;

			getBIds()
				.then(findAByBIds)
				.then(function (foundA) {
					expect(foundA).to.be.not.empty;
					done();
				});

			function getBIds() {
				return B.find().limit(1).then(function (rows) {
					return [rows[0].id];
				});
			}

			function findAByBIds(ids) {
				expect(util.isArray(ids)).to.be.true;
				return A.find({B: ids}).limit(1);
			}
		});
	});

	it("should be able to find by B and populate B", function (done) {
		waterline.then(function (models) {
			var A = models.collections.a;
			var B = models.collections.b;

			getBIds()
				.then(findAByBIds)
				.then(function (foundA) {
					expect(foundA).to.be.not.empty;
					done();
				});

			function getBIds() {
				return B.find().limit(1).then(function (rows) {
					return [rows[0].id];
				});
			}

			function findAByBIds(ids) {
				expect(util.isArray(ids)).to.be.true;
				return A.find({B: ids}).limit(1).populate('B');
			}
		});
	});
});


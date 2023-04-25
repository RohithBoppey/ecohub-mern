const app = require("../server");
const user_router = require("../routes/user_routes");
const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);

describe("Operation Checker for Users", () => {
	it("Should give a list of users when requested", (done) => {
		chai.request(app)
			.get("/users/")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array");
				done();
			});
	});
});

describe("Operation Checker for Messages", () => {
	it("Should give a array of messages when requested", (done) => {
		chai.request(app)
			.get("/messages/")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array");
				done();
			});
	});
});

describe("Operation Checker for Products", () => {
	it("Should give a array of Products when requested", (done) => {
		chai.request(app)
			.get("/products/")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array");
				done();
			});
	});
});

describe("Operation Checker for Articles", () => {
	it("Should give a array of Articles when requested", (done) => {
		chai.request(app)
			.get("/articles/")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array");
				done();
			});
	});
});

describe("Operation Checker for Vehicles", () => {
	it("Should give a array of Vehicles when requested", (done) => {
		chai.request(app)
			.get("/vehicles/")
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array");
				done();
			});
	});
});

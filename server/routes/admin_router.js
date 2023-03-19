const express = require("express");
const Admin = require("../models/Admin");
const admin_router = express.Router();

admin_router.get("/", async (req, res) => {
	// console.log("in req")
	const users = await Admin.find();
	res.json(users);
});

module.exports = admin_router;

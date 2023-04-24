const express = require("express");
const allVehicle = require("../models/AllVehicle");
const allvehicle_router = express.Router();
const redisClient = require("../redis/redis");

allvehicle_router.get("/", async (req, res) => {
	// console.log("in req")
	// const allvehicles = await allVehicle.find();
	// res.json(allvehicles);
	let vehicles = [];
	const cacheKey = "all-allvehicles";
	let clients = await redisClient.get(cacheKey);
	if (!clients) {
		vehicles = await allVehicle.find();
		redisClient.set(cacheKey, JSON.stringify(vehicles));
		console.log("All vehicles Set into Redis client");
	} else {
		console.log("All vehicles Retreived from Redis client");
		vehicles = clients;
		vehicles = JSON.parse(vehicles);
	}
	res.json(vehicles);
});

module.exports = allvehicle_router;

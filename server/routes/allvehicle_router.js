const express = require("express");
const allVehicle = require("../models/AllVehicle");
const allvehicle_router = express.Router();
const redisClient = require('../redis/redis');

allvehicle_router.get("/", async (req, res) => {
	// console.log("in req")
	// const allvehicles = await allVehicle.find();
	// res.json(allvehicles);
	let vehicles = []
	const cacheKey = 'all-allvehicles';
	let clients = await redisClient.get(cacheKey)
	if(!clients){
		vehicles = await allVehicle.find();
		redisClient.set(cacheKey, JSON.stringify(vehicles));
		console.log('Set into Redis client')
	}else{
		console.log('Retreived from Redis client')
		vehicles = clients;
	}
	res.json(vehicles);
});

module.exports = allvehicle_router;

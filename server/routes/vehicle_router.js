const express = require("express");
const ElectricVehicle = require("../models/ElectricVehicleSmall");
const vehicle_router = express.Router();
const redisClient = require('../redis/redis');

vehicle_router.get("/", async (req, res) => {
	// console.log("in req")
	// const vehicles = await ElectricVehicle.find();
	// res.json(vehicles);
	let vehicles = []
	const cacheKey = 'allvehicles';
	let clients = await redisClient.get(cacheKey)
	if(!clients){
		vehicles = await ElectricVehicle.find();
		redisClient.set(cacheKey, JSON.stringify(vehicles));
		console.log('Set into Redis client')
	}else{
		console.log('Retreived from Redis client')
		vehicles = clients;
	}
	res.json(vehicles);
});

module.exports = vehicle_router;

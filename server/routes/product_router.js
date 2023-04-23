const express = require("express");
const Product = require("../models/Product");
const product_router = express.Router();
const redisClient = require('../redis/redis');

product_router.get("/", async (req, res) => {
	// console.log("in req")
	// const products = await Product.find();
	// res.json(products);
	let products = []
	const cacheKey = 'all-products';
	let clients = await redisClient.get(cacheKey)
	if(!clients){
		products = await Product.find();
		redisClient.set(cacheKey, JSON.stringify(products));
		console.log('Set into Redis client')
	}else{
		console.log('Products Retreived from Redis client')
		products = clients;
		products = JSON.parse(products);
	}
	res.json(products);
});

module.exports = product_router;

const express = require("express");
const Faq = require("../models/Faq");
const faq_router = express.Router();
const redisClient = require('../redis/redis');

faq_router.get("/", async (req, res) => {
  // const faq = await Faq.find();
  // return res.json({ faq });
  let FAQs = []
	const cacheKey = 'all-faqs';
	let clients = await redisClient.get(cacheKey)
	if(!clients){
		FAQs = await Faq.find();
		redisClient.set(cacheKey, JSON.stringify(FAQs));
		console.log('Set into Redis client')
	}else{
		console.log('Retreived from Redis client')
		FAQs = clients;
	}
	res.json(FAQs);
});

module.exports = faq_router;
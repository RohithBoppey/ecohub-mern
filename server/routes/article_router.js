const express = require("express");
const Article = require("../models/Article");
const article_router = express.Router();
const redisClient = require("../redis/redis");

article_router.get("/", async (req, res) => {
	let articles = [];
	const cacheKey = "all-articles";
	let clients = await redisClient.get(cacheKey);
	if (!clients) {
		articles = await Article.find();
		redisClient.set(cacheKey, JSON.stringify(articles));
		console.log("Articles Set into Redis client");
	} else {
		console.log("Articles Retreived from Redis client");
		articles = clients;
		articles = JSON.parse(articles);
	}
	return res.json(articles);
});

module.exports = article_router;

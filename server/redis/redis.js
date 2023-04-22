const redis = require("redis");
const client = redis.createClient(process.env.REDIS_PORT);
client
	.connect()
	.then(() => {
		console.log("Redis connected and is running!");
	})
	.catch((err) => {
		console.log(err);
	});
	
module.exports = client;

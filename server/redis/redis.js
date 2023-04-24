const redis = require("redis");

const client = redis.createClient({
	password: "wFB1LEmrLlcpkQYnYb5v7BJf5OiKX3P8",
	socket: {
		host: "redis-13787.c10.us-east-1-2.ec2.cloud.redislabs.com",
		port: 13787,
	},
});

client.connect();

module.exports = client;

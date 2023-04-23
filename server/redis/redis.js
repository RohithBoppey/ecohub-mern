const redis = require("redis");
// const client = redis.createClient(process.env.REDIS_PORT);
// client
// 	.connect()
// 	.then(() => {
// 		console.log("Redis connected and is running!");
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});



	const client = redis.createClient({
		password: 'cbs4E67wBspSKw5cKo0ldtyRWO2tCJPb',
		socket: {
			host: 'redis-16115.c81.us-east-1-2.ec2.cloud.redislabs.com',
			port: 16115
		}
	});


	client.connect();
	
module.exports = client;

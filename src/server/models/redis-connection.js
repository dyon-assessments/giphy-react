const redis = require('redis');

const RedisClient = redis.createClient()

RedisClient.on('error', (err) => {
  console.log("Error " + err);
});

module.exports = RedisClient;

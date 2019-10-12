const RedisClient = require('./redis-connection');

const RedisGiphyModel = () => {
};

RedisGiphyModel.isCacheData = (giphyRedisKey) => {
  RedisClient.exists(giphyRedisKey, (err, reply) => {
    if (reply == 1) {
      return true;
    } else {
      return false;
    }
  });
};

RedisGiphyModel.getCacheData = (giphyRedisKey) => {
  RedisClient.get(giphyRedisKey, (err, reply) => {
    if (reply) {
      return JSON.parse(reply);
    } else {
      return false;
    }
  });
};

RedisGiphyModel.setCacheData = (giphyRedisKey, giphyData) => {
  RedisClient.setex(giphyRedisKey, 3600, JSON.stringify(giphyData));
};

module.exports = RedisGiphyModel;

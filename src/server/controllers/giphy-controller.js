const giphy = require('giphy-api')('9L54s1y6s8WjmOxWDE5ZWV2sk57G2Kh5');
const RedisGiphyModel = require('../models/redis-giphy-model');

const GiphyController = () => {
};

GiphyController.getGiphy = (req, res) => {
  const giphyRedisKey = 'giphy:query=' + req.body.query + '&offset=' + req.body.offset;

  if (RedisGiphyModel.isCacheData(giphyRedisKey)) {
    res.send(RedisGiphyModel.getCacheData(giphyRedisKey));
  } else {
    giphy.search({
      limit: 25,
      q: req.body.query,
      offset: req.body.offset //this is that pagination thingy
    }, (err, response) => {
      RedisGiphyModel.setCacheData(giphyRedisKey, JSON.stringify(response));
      res.send(response);
    });
  }
};

module.exports = GiphyController;

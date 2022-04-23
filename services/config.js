const RedisClient = require("redis").createClient;

const redisCon = RedisClient({
  host: "redis-15083.c261.us-east-1-4.ec2.cloud.redislabs.com",
  port: 15083,
  password: "T5W40RnFU8MCNQBLr2SYkubs93byVUnU",
});

/**
 * REDIS get by key
 */

redisCon.on("connect", function () {
  console.log("redis connected");
  console.log(`connected ${redisCon.connected}`);
});

function getCache(redis_key) {
  console.log("first bock exec : ", redis_key);
  return new Promise((resolve) => {
    redisCon.get(redis_key, (err, reply) => {
      if (err) {
        console.log("Err on redis get : ", err);
      } else {
        console.log("Success get cache from redis by key : ", redis_key);
        console.log("reply from redis : ", reply);
        resolve({ reply });
      }
    });
  });
}

/**
 * Redis set by key and value
 */
function setCache(redis_key, redis_value) {
  console.log("Success redis set : ", redis_key, redis_value);
  redisCon.set(redis_key, redis_value);
}

module.exports = {
  getCache,
  setCache,
};

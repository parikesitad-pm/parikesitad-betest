const redis = require("redis");
const config = {
  host: "redis-15083.c261.us-east-1-4.ec2.cloud.redislabs.com",
  port: 15083,
  password: "T5W40RnFU8MCNQBLr2SYkubs93byVUnU",
};

// console.log("redis host", config.host);

const client = redis.createClient({
  host: config.host,
  port: config.port,
  password: config.password,
});

const { promisify } = require("util");
const setAsyncEx = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

client.on("error", (err) => {
  console.log("error Client on " + err);
});

async function saveWithTtl(key, value, ttlSeconds = 60) {
  return await setAsyncEx(key, ttlSeconds, JSON.stringify(value));
}

async function get(key) {
  const jsonString = await getAsync(key);

  if (jsonString) {
    return JSON.parse(jsonString);
  }
}

module.exports = {
  saveWithTtl,
  get,
};

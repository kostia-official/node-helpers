const FAIL_EXCHANGE = 'fail';
const FAIL_QUEUE = 'fail-queue';
const RECONNECT_INTERVAL = 3000;
const RECONNECT_TRIES = 20;

const debug = require('debug')('app:node-helpers:amqp');
const amqp = require('amqplib');
const retry = require('bluebird-retry');

let channel;
let amqpUrl;

function getChannel() {
  if (channel) return Promise.resolve(channel);

  return retry(() => {
    return new Promise(async(resolve, reject) => {
      try {
        const connection = await amqp.connect(amqpUrl);

        connection.on('error', (err) => {
          debug(err);
          reject(err);
        });

        channel = await connection.createChannel();

        await channel.assertExchange(FAIL_EXCHANGE, 'topic', { durable: true });
        await channel.assertQueue(FAIL_QUEUE, { exclusive: false, durable: true });
        await channel.bindQueue(FAIL_QUEUE, FAIL_EXCHANGE, '#');

        resolve(channel);
      } catch (err) {
        debug(err);
        reject(err);
      }
    });
  }, { interval: RECONNECT_INTERVAL, max_tries: RECONNECT_TRIES });
}

async function publish(exchange, key, msg) {
  return await (await getChannel()).publish(exchange, key, new Buffer(JSON.stringify(msg)));
}

async function assertQueue(queue, exchange, key) {
  const channel = await getChannel();

  await channel.assertExchange(exchange, 'topic', { durable: true });
  await channel.assertQueue(queue, { exclusive: false, durable: true });
  await channel.bindQueue(queue, exchange, key);
  debug('assertQueue', { queue, exchange, key });
}

async function consume(queue, fn) {
  const channel = await getChannel();
  channel.consume(queue, async msg => {
    const data = JSON.parse(msg.content.toString());
    try {
      await fn(data);
    } catch (err) {
      debug('Error in queue', queue, err, data);
      channel.publish(FAIL_EXCHANGE, '', new Buffer(JSON.stringify({ err: err.message, data })));
    }
  }, { noAck: true, exclusive: false });
}

function consumeAsync(queue) {
  return new Promise(async resolve => {
    const channel = await getChannel();
    channel.consume(queue, msg => {
      resolve(JSON.parse(msg.content.toString()));
    }, { noAck: true });
  });
}

module.exports = function (url) {
  amqpUrl = url;

  return {
    consumeAsync,
    getChannel,
    publish,
    assertQueue,
    consume
  }
};

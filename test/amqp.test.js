const test = require('ava');
const url = 'amqp://localhost';
const ampq = require('../src/amqp')(url);

const message = { text: 'hello' };
const queue = 'q';
const err = new Error('err');

const EVENT_EXCHANGE = 'test';
const FAIL_QUEUE = 'fail-queue';

test('amqp', async t => {
  await ampq.getChannel();
  await ampq.assertQueue(queue, EVENT_EXCHANGE, '#');
  await ampq.publish(EVENT_EXCHANGE, 'user.create', message);
  const msg = await ampq.consumeAsync(queue);

  t.deepEqual(msg, message);
});

test.cb('amqp failed', t => {
  let called = false;
  const failConsume = async() => {
    throw err;
  };

  ampq.assertQueue('queue2', EVENT_EXCHANGE, 'error')
    .then(() => ampq.publish(EVENT_EXCHANGE, 'error', message))
    .then(() => {
      ampq.consume('queue2', failConsume);
      ampq.consume(FAIL_QUEUE, async msg => {
        t.deepEqual(msg.data, message);
        t.deepEqual(msg.err, err.message);
        if (!called) {
          t.end();
          called = true;
        }
      });
    });
});

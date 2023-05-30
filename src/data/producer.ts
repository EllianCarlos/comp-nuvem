import { kafka } from '../bootstrap';

export const handler = async () => {
  const postProducer = kafka.producer({ allowAutoTopicCreation: true });

  await postProducer.connect();
  await postProducer.send({
    topic: 'data',
    messages: [
      {
        value: JSON.stringify({
          id: 'sensor1',
          value: '16.29',
          type: 'volts',
          timestamp: (new Date()).getTime()
        }),
      },
    ],
  });

  await postProducer.disconnect();
};

handler();

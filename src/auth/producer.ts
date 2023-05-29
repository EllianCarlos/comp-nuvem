import { kafka } from '../bootstrap';

export const handler = async () => {
  const registerProducer = kafka.producer({ allowAutoTopicCreation: true });

  await registerProducer.connect();
  await registerProducer.send({
    topic: 'register',
    messages: [
      {
        value: JSON.stringify({
          id: 'sensor1',
          pass: '',
        }),
      },
    ],
  });

  await registerProducer.disconnect();
};

handler();

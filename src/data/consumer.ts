import { kafka } from '../bootstrap';
import { post } from './controllers/post';

export const handler = async () => {
  const postConsumer = kafka.consumer({ groupId: 'data' });

  await postConsumer.connect();
  await postConsumer.subscribe({ topic: 'data' });

  // message:
  // {
  //  id: string,
  //  value: string,
  //  type: string,
  // }

  await postConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`new message ${partition} in ${topic}`);
      try {
        const postMessage = JSON.parse(message.value as unknown as string);

        await post(
          postMessage.id,
          postMessage.value,
          postMessage.type,
          postMessage.timestamp
        );
      } catch (e) {
        console.error(e);
      }
    },
  });
};

handler();

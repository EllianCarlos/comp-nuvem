import { kafka } from '../bootstrap';
import { register } from './index';

export const handler = async () => {
  const registerConsumer = kafka.consumer({ groupId: 'auth' });

  await registerConsumer.connect();
  await registerConsumer.subscribe({ topic: 'register', fromBeginning: true });

  // message:
  // {
  //  id: string,
  //  pass: string,
  //  metadata?: any,
  // }

  await registerConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`new message ${partition} in ${topic}`);
      try {
        const registerMessage = JSON.parse(message.value as unknown as string);

        await register(
          registerMessage.id,
          registerMessage.pass,
          registerMessage.metadata
        );
      } catch (e) {
        console.error(e);
      }
    },
  });
};

handler();

import { Kafka } from 'kafkajs';
import './common/config';

export const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9037'],
});

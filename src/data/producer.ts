import { kafka } from '../bootstrap';

export const handler = async () => {
  const postProducer = kafka.producer({ allowAutoTopicCreation: true });

  await postProducer.connect();
  await postProducer.send({
    topic: 'data',
    messages: [
      { value: JSON.stringify({ "id": "sensor57", "value": "94.56", "type": "Volts", "timestamp": `${(new Date()).getTime()}` }) },
      { value: JSON.stringify({ "id": "sensor41", "value": "85.32", "type": "pH", "timestamp": `${(new Date()).getTime()}` }) },
      { value: JSON.stringify({ "id": "sensor92", "value": "78.12", "type": "N", "timestamp": `${(new Date()).getTime()}` }) },
      { value: JSON.stringify({ "id": "sensor13", "value": "70.23", "type": "P", "timestamp": `${(new Date()).getTime()}` }) },
      { value: JSON.stringify({ "id": "sensor35", "value": "62.48", "type": "K", "timestamp": `${(new Date()).getTime()}` }) },
      { value: JSON.stringify({ "id": "sensor88", "value": "53.19", "type": "Volts", "timestamp": `${(new Date()).getTime()}` }) },
      { value: JSON.stringify({ "id": "sensor79", "value": "46.76", "type": "pH", "timestamp": `${(new Date()).getTime()}` }) },
      { value: JSON.stringify({ "id": "sensor71", "value": "39.11", "type": "N", "timestamp": `${(new Date()).getTime()}` }) },
      { value: JSON.stringify({ "id": "sensor97", "value": "32.66", "type": "P", "timestamp": `${(new Date()).getTime()}` }) },
      { value: JSON.stringify({ "id": "sensor14", "value": "25.85", "type": "K", "timestamp": `${(new Date()).getTime()}` }) },
    ]
  });

  await postProducer.disconnect();
};

handler();

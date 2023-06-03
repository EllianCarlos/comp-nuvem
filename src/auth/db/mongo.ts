import mongoose from 'mongoose';
import { Config } from '../../common/config';
import { connect } from '../../common/mongo';
import sp from 'synchronized-promise';

let connection: typeof mongoose;

const connectThis = async () => {
  if (!connection) connection = await connect(Config.getMongoSensorsURI());
  return connection;
};

sp(connectThis)();

export const disconnect = async () => {
  console.log('Disconnected');

  return connection.disconnect();
};

const generate = async () => {
  const sensorSchema = new connection.Schema({
    id: {
      type: String,
      index: true,
      unique: true,
    },
    pass: {
      type: String,
    },
    metadata: Object,
  });

  const sensorModel = connection.model(
    'sensor',
    sensorSchema,
    'sensorCollection'
  );

  return { sensorSchema, sensorModel };
};

export const ensureConnection = connectThis;
export const { sensorSchema, sensorModel } = sp(() => generate())();

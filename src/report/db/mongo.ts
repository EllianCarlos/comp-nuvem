import mongoose from 'mongoose';
import { Config } from '../../common/config';
import { connect } from '../../common/mongo';
import sp from 'synchronized-promise';

let connection: typeof mongoose;

const connectThis = async () => {
  if (!connection) connection = await connect(Config.getMongoDataURI());
  return connection;
};

sp(connectThis)();

export const disconnect = async () => {
  console.log('Disconnected');

  return connection.disconnect();
};

const generate = async () => {
  const dataSchema = new connection.Schema({
    id: String,
    value: String,
    timestamp: String,
    type: String,
  });

  const dataModel = connection.model('data', dataSchema, 'dataCollection');

  return { dataSchema, dataModel };
};

export const ensureConnection = connectThis;
export const { dataSchema, dataModel } = sp(() => generate())();

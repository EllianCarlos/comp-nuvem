import mongoose from 'mongoose';

let connection: typeof mongoose;

export const connect = async (
  uri: string,
  options?: mongoose.ConnectOptions
): Promise<typeof mongoose> => {
  connection = await mongoose.connect(uri, options);
  console.log('Connected to mongodb.');

  return connection;
};

export const disconnect = async () => {
  await connection.disconnect();
};

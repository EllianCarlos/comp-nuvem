import { ensureConnection, sensorModel } from '../db/mongo';
import { hash, genSalt } from 'bcryptjs';

export const register = async (id: string, pass: string, metadata: any) => {
  await ensureConnection();

  const salt = await genSalt();
  const hashedPassword = await hash(pass, salt);

  const newRegister = new sensorModel({ id, pass: hashedPassword, metadata });

  return await newRegister.save();
};

import { ensureConnection, sensorModel } from '../db/mongo';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Config } from '../../common/config';

export const login = async (id: string, pass: string) => {
  await ensureConnection();

  const register = await sensorModel.findOne({
    id,
  });

  const isPassword = await compare(pass, register.pass!);

  if (isPassword) {
    const token = jwt.sign(
      {
        id: register.id,
        _id: register._id,
        time: Date.now().toString(),
        metadata: register.metadata,
      },
      Config.getJwtSecret()
    );

    return token;
  }

  throw new Error('Blablbal');
};

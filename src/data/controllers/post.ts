import { ensureConnection, dataModel } from '../db/mongo';

export const post = async (
  id: string,
  value: string,
  type: string,
  timestamp: string
) => {
  await ensureConnection();

  const data = new dataModel({
    id,
    value,
    type,
    timestamp,
  });

  return await data.save();
};

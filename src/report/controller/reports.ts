import express, { Request, Response } from 'express';
import { dataModel, ensureConnection } from '../db/mongo';
const app = express();
const port = 20153;

// @ts-ignore
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// @ts-ignore
app.get('/reports', async (req: Request, res: Response) => {
  await ensureConnection();

  const data = await dataModel.find();

  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

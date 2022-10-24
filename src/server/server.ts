import express, { Request, Response } from 'express';
import path from 'path';
import profileRouter from './routes/profile.route';

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static('dist'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join('dist', 'index.html'));
});

app.use('/api', profileRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
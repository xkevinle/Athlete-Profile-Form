import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import profileRouter from './routes/profile.route';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('dist'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join('dist', 'index.html'));
});

app.use('/api', profileRouter);

interface IErrHandler {
  log: string;
  message: string;
}

app.use((err: IErrHandler, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errObj = { ...defaultErr, ...err};
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message)
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

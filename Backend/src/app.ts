import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/sequelize';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sequelize.authenticate()
  .then(() => console.log('Postgres connected'))
  .catch((err: any) => console.log('An error occurred while connecting to Postgres:', err));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
    return res.status(200).json({ message: 'Options are working.' });
  }
  next();
});

// User Controller Routes
import stationRoutes from './routes/station';

app.get("/api/v1", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, World!" });
});

app.use('/api/v1/station', stationRoutes);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: err.message,
  });
});

export default app;

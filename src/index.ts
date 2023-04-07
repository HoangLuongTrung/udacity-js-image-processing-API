import express from 'express';
import routes from './routes/index';
const app: express.Application = express();
const port = 3000;

app.use('/', routes);

app.listen(port, () => {
  console.log('server start', port);
});

export default app;

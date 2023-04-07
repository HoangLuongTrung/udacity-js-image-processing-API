import express from 'express';
import images from './api/images';
const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send(
    'Please input URL with full information with filename, width, height (for Example: http://localhost:3000/api/images?filename=fjord&width=200&height=200)'
  );
});

routes.use('/api/images', images);
export default routes;

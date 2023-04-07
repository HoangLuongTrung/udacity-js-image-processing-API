import express from 'express';
import { promises as fs } from 'fs';
const images = express.Router();
import path from 'path';
import createThumbnail from '../utils/create-thumbnail';
import validation from '../utils/validation';
import { RequestParams } from '../models/image-processing.model';

images.get('/', async (req: express.Request, res: express.Response) => {
  const width = req.query.width as unknown as number;
  const height = req.query.height as unknown as number;

  const imagesFullPath = path.resolve(__dirname, '../../assets/images');
  const imagesThumbPath = path.resolve(__dirname, '../../assets/thumbnails');
  const imageUrl = path.resolve(imagesFullPath, `${req.query.filename}.jpg`);
  const thumbnailUrl = path.resolve(
    imagesThumbPath,
    `${req.query.filename}-thumb.jpg`
  );
  const errorMgs = await validation(req.query as unknown as RequestParams);
  if (errorMgs) {
    res.send(errorMgs);
    return;
  }

  await createThumbnail({
    width: width,
    height: height,
    urlImage: imageUrl,
    urlThumbnail: thumbnailUrl
  });

  const filePath = path.resolve(
    imagesThumbPath,
    `${req.query.filename}-thumb.jpg`
  );
  try {
    await fs.access(filePath);
    res.sendFile(filePath);
  } catch {
    res.send(
      'URL is wrong, you can access with URL: http://localhost:3000/api/images?filename=fjord&width=200&height=200'
    );
  }
});

export default images;

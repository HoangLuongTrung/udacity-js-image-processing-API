import express from 'express';
import { promises as fs } from 'fs';
const images = express.Router();
import path from 'path';
import createThumbnail from '../utils/create-thumbnail';
import validation from '../utils/validation';
import checkImageExist from '../utils/check-exist-image';
import { RequestParams } from '../models/image-processing.model';

images.get('/', async (req: express.Request, res: express.Response) => {
  const width = req.query.width as unknown as number;
  const height = req.query.height as unknown as number;

  const imagesFullPath = path.resolve(__dirname, '../../assets/images');
  const imagesThumbPath = path.resolve(__dirname, '../../assets/thumbnails');
  const imageUrl = path.resolve(imagesFullPath, `${req.query.filename}.jpg`);
  const thumbnailUrl = path.resolve(
    imagesThumbPath,
    `${req.query.filename}-${width}-${height}.jpg`
  );
  const errorMgs = await validation(req.query as unknown as RequestParams);
  if (errorMgs) {
    res.send(errorMgs);
    return;
  }
  ;

  let errCreate: string | null = '';
  if (!(await checkImageExist(thumbnailUrl))) {
    errCreate = await createThumbnail({
      width: width,
      height: height,
      urlImage: imageUrl,
      urlThumbnail: thumbnailUrl
    });
  }

  if (errCreate) {
    res.send(errCreate);
    return;
  }

  const filePath: string =
    req.query.width && req.query.height
      ? path.resolve(
        imagesThumbPath,
        `${req.query.filename}-${req.query.width}-${req.query.height}.jpg`
      )
      : path.resolve(imagesFullPath, `${req.query.filename}.jpg`);
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

import express from "express";
import createThumbnail from '../utils/create-thumbnail';
import validation from '../utils/validation';
const images = express.Router();
import path from 'path';
import { RequestParams } from "../models/image-processing.model";

images.get("/", async (req: express.Request, res: express.Response) => {
  const width = req.query.width as unknown as number;
  const height = req.query.height as unknown as number;

  const imagesFullPath = path.resolve(__dirname, '../../assets/images');
  const imagesThumbPath = path.resolve(__dirname, '../../assets/thumbnails');
  const full = path.resolve(imagesFullPath, `${req.query.filename}.jpg`)
  const thumbnail = path.resolve(imagesThumbPath, `${req.query.filename}-thumb.jpg`)

  const errorMgs = await validation(req.query as unknown as RequestParams);
  if (errorMgs) {
    res.send(errorMgs);
    return;
  }

  await createThumbnail({
    width: width,
    height: height,
    urlImage: full,
    urlThumbnail: thumbnail,
  });

  const filePath = path.resolve(imagesThumbPath, `${req.query.filename}-thumb.jpg`);

  res.sendFile(filePath)
});

export default images;

import express from "express";
import createThumbnail from '../utils/create-thumbnail';
const images = express.Router();
import path from 'path';

export interface Request {
  width: number;
  height: number;
  fileName: string;
}

images.get("/", async (req: express.Request, res: express.Response) => {
  const width = req.query.width as unknown as number;
  const height = req.query.height as unknown as number;

  const imagesFullPath = path.resolve(__dirname, '../../assets/images');
  const imagesThumbPath = path.resolve(__dirname, '../../assets/thumbnails');
  const full = path.resolve(imagesFullPath, `${req.query.filename}.jpg`)
  const thumbnail = path.resolve(imagesThumbPath, `${req.query.filename}-thumb.jpg`)


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

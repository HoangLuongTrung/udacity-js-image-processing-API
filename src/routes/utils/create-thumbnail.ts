import sharp from 'sharp';
import { ParamResize } from '../models/image-processing.model';

const createThumbnail = async (params: ParamResize): Promise<string | null> => {
  try {
    await sharp(params.urlImage)
      .resize(+params.width, +params.height)
      .toFormat('jpeg')
      .toFile(params.urlThumbnail);
    return null;
  } catch (error) {
    return 'Image could not be processed.';
  }
};

export default createThumbnail;

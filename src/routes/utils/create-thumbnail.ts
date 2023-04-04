import sharp from "sharp";
import { ParamResize } from "../models/image-processing.model";

const createThumbnail = async (params: ParamResize): Promise<string | null> => {
  try {
    await sharp(params.urlImage)
      .resize(+params.width, +params.height)
      .toFormat('jpeg')
      .toFile(params.urlThumbnail);
  } catch (error) {
    console.log(error)
  }
  return null
}

export default createThumbnail;
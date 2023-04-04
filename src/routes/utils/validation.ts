import { RequestParams } from "../models/image-processing.model";

const validation = async (params: RequestParams): Promise<string | null> => {
  if (isNaN(params.height)) {
    return "Please input heigh resize param";
  } else if (isNaN(params.width)) {
    return "Please input width resize param";
  } else if (!params.filename) {
    return "Please input image param";
  }
  return null;
}

export default validation;
import { promises as fs } from 'fs';
import path from 'path';
import { RequestParams } from '../models/image-processing.model';


const isValidImage = async (filename: string): Promise<boolean> => {
  if (!filename) {
    return false;
  }
  return (await getListImageExist()).includes(filename);
}

const getListImageExist = async (): Promise<string[]> => {
  const imagesFullPath = path.resolve(__dirname, '../../assets/images');
  const getListImage = await fs.readdir(imagesFullPath);
  return getListImage.length > 0  ? getListImage.map(x => x.split('.')[0]) : [];
}


const validation = async (params: RequestParams): Promise<string | null> => {
  if (!(await isValidImage(params.filename))) {
    const listFileNames = (await getListImageExist()).join(' ,')
    return `Please input with file name correct is "filename". Some filenames are exist is: ${listFileNames}.`;
  }

  if (!params.width && !params.height) {
    return null;
  }

  if (Number.isNaN(params.width) || +params.width < 1) {
    return `Please input with file name correct is "width".`;
  }

  if (Number.isNaN(params.height) || +params.height < 1) {
    return `Please input with file name correct is "height"`;
  }
  return null;
};

export default validation;

import { promises as fs } from 'fs';

const checkImageExist = async (filename: string): Promise<boolean> => {
  try {
    await fs.access(filename);
    return true;
  } catch (error) {
    return false
  }
}

export default checkImageExist;
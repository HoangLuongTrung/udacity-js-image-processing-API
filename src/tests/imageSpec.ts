import path from 'path';
import createThumbnail from '../routes/utils/create-thumbnail';

describe('There is at least one test for image processing', (): void => {
  const fileName = 'test';
  it('With file name is not exist', async (): Promise<void> => {
    const imagesFullPath = path.resolve(__dirname, '../../assets/images');
    const imagesThumbPath = path.resolve(__dirname, '../../assets/thumbnails');
    const imageUrl = path.resolve(imagesFullPath, `${fileName}.jpg`);
    const thumbnailUrl = path.resolve(imagesThumbPath, `${fileName}-thumb.jpg`);
    const error: null | string = await createThumbnail({
      urlImage: imageUrl,
      urlThumbnail: thumbnailUrl,
      width: 200,
      height: 300
    });
    expect(error).not.toBeNull();
  });
});

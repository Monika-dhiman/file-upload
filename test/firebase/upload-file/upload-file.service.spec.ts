import { FirebaseUploadFileHandler } from 'src/firebase/upload-file/upload-file.service';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import * as fs from 'fs';

describe('FirebaseUploadFileHandler', () => {
  let uploadFileHandler: FirebaseUploadFileHandler;
  it('should pass', () => {
    expect(true).toBe(true);
  });
  let firebaseService: FirebaseService;
  beforeEach(() => {
    uploadFileHandler = new FirebaseUploadFileHandler(firebaseService);
  });

  it('should upload a file successfully', async () => {
    const file = fs.readFileSync('src/libs/images/image-1.jpg'); // import here Mock file from src\libs\images\image-1.jpg
    const result = await uploadFileHandler.handle(file);

    expect(result.success).toBe(true);
    expect(result.url).toBeDefined();
    expect(result.error).toBeUndefined();
  });

  it('should handle file upload error', async () => {
    const file = {}; // import here Mock file object from
    // Mocking the FirebaseService to throw an error
    uploadFileHandler.handle = jest
      .fn()
      .mockRejectedValue(new Error('Upload failed'));

    const result = await uploadFileHandler.handle(file);

    expect(result.success).toBe(false);
    expect(result.url).toBeUndefined();
    expect(result.error).toBe('Upload failed');
  });
});

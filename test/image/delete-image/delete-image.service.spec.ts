import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseDeleteFileHandler } from 'src/features/firebase/delete-file/delete-file.service';
import { DeleteImageHandler } from 'src/features/image/delete-image/delete-image.service';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

jest.mock('firebase-admin', () => {
  const fileMock = {
    delete: jest.fn().mockResolvedValue(undefined),
  };
  const storageMock = {
    bucket: jest.fn(() => ({
      file: jest.fn(() => fileMock),
    })),
  };
  return {
    initializeApp: jest.fn(),
    credential: {
      applicationDefault: jest.fn(),
    },
    storage: jest.fn(() => storageMock),
  };
});

describe('Test cases for DeleteImageHandler class', () => {
  let deleteImageHandler: DeleteImageHandler;
  let firebaseDeleteFile: FirebaseDeleteFileHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteImageHandler, FirebaseService, FirebaseDeleteFileHandler],
    }).compile();

    firebaseDeleteFile = module.get<FirebaseDeleteFileHandler>(FirebaseDeleteFileHandler);
    deleteImageHandler = module.get<DeleteImageHandler>(DeleteImageHandler);
  });

  describe('handler', () => {
    it('should delete the file and return success message', async () => {
      const publicUrl = 'https://your-storage-bucket-url/image-1.jpg?timestamp=1234567890';

      const result = await deleteImageHandler.handler(publicUrl);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Image deleted successfully');
      expect(result.error).toBeUndefined();
    });

    it('should handle errors during file deletion', async () => {
      const publicUrl = 'https://your-storage-bucket-url/image-1.jpg?timestamp=1234567890';
      jest.spyOn(firebaseDeleteFile, 'handle').mockRejectedValue(new Error('Error deleting image'));

      try {
        await deleteImageHandler.handler(publicUrl);
      } catch (error) {
        expect(error.message).toBe('Error deleting image');
      }
    });
  });
});
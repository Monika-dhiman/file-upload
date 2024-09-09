import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import { FirebaseUploadFileHandler } from 'src/features/firebase/upload-file/upload-file.service';
import { UploadImageHandler } from 'src/features/image/upload-image/upload-image.service';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

// Mock the Firebase admin SDK
jest.mock('firebase-admin', () => {
  const createWriteStreamMock = {
    on: jest.fn().mockImplementation(function (event, callback) {
      if (event === 'finish') {
        callback();
      }
      return this;
    }),
    end: jest.fn(),
  };
  const fileMock = {
    createWriteStream: jest.fn(() => createWriteStreamMock),
    makePublic: jest.fn().mockResolvedValue(undefined),
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

describe('Test cases for imageUploadHandler class', () => {
  let imageUploadHandler: UploadImageHandler;
  let firebaseFileUpload: FirebaseUploadFileHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadImageHandler, FirebaseService, FirebaseUploadFileHandler],
    }).compile();

    firebaseFileUpload = module.get<FirebaseUploadFileHandler>(FirebaseUploadFileHandler);
    imageUploadHandler = module.get<UploadImageHandler>(UploadImageHandler);
  });

  describe('handle', () => {
    it('should throw an error if no file is uploaded', async () => {
      try {
        await imageUploadHandler.handle(undefined);
      } catch (error) {
        expect(error.message).toBe("No file uploaded");
      }
    });
    it('should return the public URL for the uploaded file', async () => {
      const file = {
        originalname: 'image-1.jpg',
        mimetype: 'image/jpeg',
        buffer: fs.readFileSync('public/images/image-1.jpg'),
      };

      const result = await imageUploadHandler.handle(file);
      expect(result.success).toBe(true);
      expect(result.url).toBeDefined();
      expect(result.error).toBeUndefined();
    }, 1000); 
  });
});
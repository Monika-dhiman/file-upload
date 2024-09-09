import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FirebaseUploadFileHandler } from 'src/features/firebase/upload-file/upload-file.service';

@Injectable()
export class UploadImageHandler {
  constructor(private firebaseFileUpload: FirebaseUploadFileHandler) {}
  async handle(
    file,
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!file) {
      throw new InternalServerErrorException('No file uploaded');
    }
    return this.firebaseFileUpload.handle(file);
  }
}

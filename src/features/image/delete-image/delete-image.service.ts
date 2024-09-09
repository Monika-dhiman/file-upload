import { Injectable } from '@nestjs/common';
import { FirebaseDeleteFileHandler } from 'src/features/firebase/delete-file/delete-file.service';

@Injectable()
export class DeleteImageHandler {
  constructor(private firebaseDeleteFile: FirebaseDeleteFileHandler) {}
  async handler(
    publicUrl: string,
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    return this.firebaseDeleteFile.handle(publicUrl);
  }
}

import {Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';


@Injectable()
export class DeleteImageHandler { //ImageUploadHandler
  constructor(private firebaseService:FirebaseService) {}
  async handler(publicUrl: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const bucket = admin
        .storage()
        .bucket(this.firebaseService.getFirebaseConfig().storageBucket);
      const fileName = publicUrl.split('/').pop()!.split('?')[0]; // Extract filename from public URL
      const file = bucket.file(fileName);

      await file.delete();

      return { success: true, message: 'Image deleted successfully' };
    } catch (err) {
      console.error('Error deleting image:', err);
      return { success: false, error: err.message };
    }
  }
}

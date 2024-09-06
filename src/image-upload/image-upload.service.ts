import { FirebaseService } from './../infrastructure/firebase/firebase.service';
import {Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';


@Injectable()
export class ImageUploadService {
  constructor(private firebaseService:FirebaseService) {}
  async uploadFile(file): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!file) {
      throw new InternalServerErrorException('No file uploaded');
    }
    const bucket = admin.storage().bucket(this.firebaseService.getFirebaseConfig().storageBucket);
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    return new Promise((resolve, reject) => {
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on('error', (err) => {
        console.error('Error uploading file:', err);
        reject({ success: false, error: err.message });
      });

      stream.on('finish', async () => {
        try {
          await fileUpload.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}?timestamp=${Date.now()}`;
          console.log('File uploaded successfully:', publicUrl);
          resolve({ success: true, url: publicUrl });
        } catch (err) {
          console.error('Error making file public:', err);
          reject({ success: false, error: err.message });
        }
      });

      stream.end(file.buffer);
    });
  }
  async deleteImage(publicUrl: string): Promise<{ success: boolean; message?: string; error?: string }> {
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

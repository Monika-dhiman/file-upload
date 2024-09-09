import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseDeleteFileHandler {
    constructor(private firebaseService: FirebaseService) {}
    async handle(fileURL: string): Promise<{ success: boolean; message?: string; error?: string }> {
        try {
            const bucket = admin
              .storage()
              .bucket(this.firebaseService.getFirebaseConfig().storageBucket);
            const fileName = fileURL.split('/').pop()!.split('?')[0]; 
            const file = bucket.file(fileName);
      
            await file.delete();
      
            return { success: true, message: 'Image deleted successfully' };
          } catch (err) {
            console.error('Error deleting image:', err);
            throw err;
          }
    }
}
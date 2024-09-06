import { Injectable } from '@nestjs/common';
import { getStorage } from 'firebase/storage';
import { initializeApp, FirebaseApp } from 'firebase/app';
import * as dotenv from 'dotenv';
import { FirebaseConfig } from './firebase.interface';
import { firebaseConfig } from './firebaseConfig';

// Load environment variables from .env file
dotenv.config();
@Injectable()
export class FirebaseService {
  private app: FirebaseApp;
  private storage: any;
  private firebaseConfig: FirebaseConfig = firebaseConfig;
  
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
  }

  getStorage(): any {
    return this.storage;
  }

  getApp(): FirebaseApp {
    return this.app;
  }

  getFirebaseConfig(): FirebaseConfig {
    return this.firebaseConfig;
  }
}

// export const firebaseService = new FirebaseService();
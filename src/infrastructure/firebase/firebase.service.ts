import { Injectable } from '@nestjs/common';
import { getStorage } from 'firebase/storage';
import { initializeApp, FirebaseApp } from 'firebase/app';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  type: string;
  private_key?: string;
}

@Injectable()
export class FirebaseService {
  private app: FirebaseApp;
  private storage: any;
  
  constructor() {
    const firebaseConfig: FirebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      type: process.env.TYPE,
      private_key: process.env.PRIVATE_KEY,
    };

    // Initialize Firebase
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
    return {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      type: process.env.TYPE,
      private_key: process.env.PRIVATE_KEY,
    };
  }
}

// export const firebaseService = new FirebaseService();
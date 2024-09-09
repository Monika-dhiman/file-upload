import { initializeApp, FirebaseApp } from 'firebase/app';
import { FirebaseConfig } from './firebase.interface';
import { firebaseConfig } from './firebase-config';
import { getStorage } from 'firebase/storage';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

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

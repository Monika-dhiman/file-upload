import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageUploadModule } from './image-upload/image-upload.module';
import * as admin from 'firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { firebaseConfig } from 'firebaseConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ImageUploadModule],
  controllers: [AppController],
  providers: [AppService,
    ConfigService, 
    {
      provide: 'FirebaseService',
      useFactory: async () => {
        const configService = new ConfigService();
        if (!admin.apps.length) {
          // const serviceAccount = (firebaseConfig)
          admin.initializeApp({
            credential: admin.credential.cert(configService.get<string>('FB_CREDENTIALS_PATH')),
            storageBucket: firebaseConfig.storageBucket, 
          });
        }
        return admin;
      },
    }
  ],
})


export class AppModule {}

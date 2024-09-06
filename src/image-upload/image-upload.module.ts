import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
// import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({})
//       {
//       storage: diskStorage({
//         destination:   
//  './uploads',
//         filename: (req:any, file:any, cb:any) => {
//           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//           cb(null, `${file.originalname}-${uniqueSuffix}.${file.mimetype.split('/')[1]}`);   

//         },
//       }),
//     }),
  ],
  controllers: [ImageUploadController],
  providers: [ImageUploadService, FirebaseService],

})
export class ImageUploadModule {}

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import { UploadImageController } from './upload-image/upload-image.controller';
import { DeleteImageController } from './delete-image/delete-image.controller';
import { UploadImageHandler } from './upload-image/upload-image.service';
import { DeleteImageHandler } from './delete-image/delete-image.service';
// import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({}),
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
  controllers: [UploadImageController, DeleteImageController],
  providers: [UploadImageHandler, DeleteImageHandler, FirebaseService],
})
export class ImageModule {}

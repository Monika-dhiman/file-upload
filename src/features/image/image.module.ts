import { FirebaseService } from './../../infrastructure/firebase/firebase.service';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadImageController } from './upload-image/upload-image.controller';
import { DeleteImageController } from './delete-image/delete-image.controller';
import { UploadImageHandler } from './upload-image/upload-image.service';
import { DeleteImageHandler } from './delete-image/delete-image.service';
import { FirebaseModule } from 'src/features/firebase/firebase.module';
import { FirebaseUploadFileHandler } from 'src/features/firebase/upload-file/upload-file.service';
import { FirebaseDeleteFileHandler } from 'src/features/firebase/delete-file/delete-file.service';
// import { diskStorage } from 'multer';

@Module({
  imports: [
    FirebaseModule,
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
  providers: [UploadImageHandler, DeleteImageHandler],
})
export class ImageModule {}

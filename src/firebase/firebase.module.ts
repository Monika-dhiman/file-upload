import { Module, InternalServerErrorException } from '@nestjs/common';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';
import { FirebaseDeleteFileHandler } from './delete-file/delete-file.service';
import { FirebaseUploadFileHandler } from './upload-file/upload-file.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FirebaseService, FirebaseUploadFileHandler, FirebaseDeleteFileHandler],
  exports: [FirebaseService, FirebaseUploadFileHandler, FirebaseDeleteFileHandler],
})
export class FirebaseModule {}

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageHandler } from './upload-image.service';
import { Response } from 'express';

@Controller('image')
export class UploadImageController {
  constructor(private readonly uploadImageHandler: UploadImageHandler) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async handle(@UploadedFile() file, @Res() res: Response) {
    try {
      const result: any = await this.uploadImageHandler.handle(file);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: err.message });
    }
  }
}

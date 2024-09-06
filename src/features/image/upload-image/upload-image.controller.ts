import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageHandler } from './upload-image.service';

@Controller('image')
export class UploadImageController {
  constructor(private readonly uploadImageHandler: UploadImageHandler) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Res() res) {
    try {
      const result: any = await this.uploadImageHandler.handler(file);
      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(500).json(result);
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
}

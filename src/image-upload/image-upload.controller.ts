import { Controller, Post, UseInterceptors, UploadedFile, Res, Delete, Body } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Res() res) {
    try {
      const result: any = await this.imageUploadService.uploadFile(file);
      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(500).json(result);
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
  
  @Delete('delete-image')
  async deleteImage(@Res() res, @Body() { publicUrl }: { publicUrl: string }) {
    console.log("publicUrl:", publicUrl);
    try {
      const result = await this.imageUploadService.deleteImage(publicUrl);
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

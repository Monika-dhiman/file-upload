import { Controller, Res, Delete, Body, HttpStatus } from '@nestjs/common';
import { DeleteImageHandler } from './delete-image.service';
import { Response } from 'express';

@Controller('image')
export class DeleteImageController {
  constructor(private readonly deleteImageHandler: DeleteImageHandler) {}
 
  @Delete('delete-image')
  async deleteImage(@Res() res: Response, @Body() { publicUrl }: { publicUrl: string }) {
    console.log("publicUrl:", publicUrl);
    try {
      const result = await this.deleteImageHandler.handler(publicUrl);
      if (result.success) {
        return res.status(HttpStatus.OK).json(result);
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
      }
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: err.message });
    }
  }
}

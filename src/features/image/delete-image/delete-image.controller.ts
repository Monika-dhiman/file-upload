import { Controller, Res, Delete, Body, HttpStatus } from '@nestjs/common';
import { DeleteImageHandler } from './delete-image.service';
import { Response } from 'express';

@Controller('image')
export class DeleteImageController {
  constructor(private readonly deleteImageHandler: DeleteImageHandler) {}

  @Delete('delete')
  async handle(
    @Res() res: Response,
    @Body() { publicUrl }: { publicUrl: string },
  ) {
    console.log('publicUrl:', publicUrl);
    try {
      const result = await this.deleteImageHandler.handler(publicUrl);
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: err.message });
    }
  }
}

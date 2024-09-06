import { Controller, Res, Delete, Body } from '@nestjs/common';
import { DeleteImageHandler } from './delete-image.service';

@Controller('image')
export class DeleteImageController {
  constructor(private readonly deleteImageHandler: DeleteImageHandler) {}
 
  @Delete('delete-image')
  async deleteImage(@Res() res, @Body() { publicUrl }: { publicUrl: string }) {
    console.log("publicUrl:", publicUrl);
    try {
      const result = await this.deleteImageHandler.handler(publicUrl);
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

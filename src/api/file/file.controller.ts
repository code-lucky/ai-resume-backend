import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/config/storage';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { Body, UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('file')
@RequireLogin()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const imagePath = `uploads/${filename}`; // 设置为你的本地图片路径
      const imageBuffer = await this.fileService.readLocalImage(imagePath);
      res.setHeader('Content-Type', 'image/jpeg'); // 设置响应的Content-Type，根据实际情况调整
      res.send(imageBuffer);
    } catch (error) {
      // 处理错误
      res.status(500).send('Error retrieving image');
    }
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor({
    storage: storage
  }))
  async fileUpload(@UploadedFiles() file: Express.Multer.File, @Body() body) {
    console.log(file);
    return {file: file[0].filename}
  }
}

import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('upload_img')
  // @UseInterceptors(AnyFilesInterceptor({
  //   storage: storage
  // }))
  upload_test(@UploadedFiles() file: Express.Multer.File, @Body() body){
    console.log('body', body);
    console.log('file', file);
  }
}

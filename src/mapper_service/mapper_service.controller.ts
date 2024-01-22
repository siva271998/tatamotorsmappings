import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MapperServiceService } from './mapper_service.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('mapper_service')
export class MapperServiceController {
  constructor(private readonly mapperServiceService: MapperServiceService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    return this.mapperServiceService.uploadAndProcessFile(file)
  }
}

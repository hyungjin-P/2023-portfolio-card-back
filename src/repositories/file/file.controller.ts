import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSaveDto } from './file-save.dto';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/uploadFile')
  @ApiOperation({
    summary: '파일 업로드',
  })
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileSaveDto: FileSaveDto,
  ): Promise<any> {
    return await this.fileService.fileSave(file, fileSaveDto);
  }
}

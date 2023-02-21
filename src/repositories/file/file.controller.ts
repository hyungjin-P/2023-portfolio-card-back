import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSaveDto } from './file-save.dto';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/uploadFile')
  @ApiOperation({
    summary: '파일 업로드',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() fileSaveDto: FileSaveDto,
  ): Promise<any> {
    return await this.fileService.fileSave(file, fileSaveDto);
  }

  @Post('/uploadFileOne')
  @ApiOperation({
    summary: '파일 업로드',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileOne(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileSaveDto: FileSaveDto,
  ): Promise<any> {
    return await this.fileService.fileSaveOne(file, fileSaveDto);
  }
}

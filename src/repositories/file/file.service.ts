import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { FileSaveDto } from './file-save.dto';

@Injectable()
export class FileService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async fileSaveOne(
    file: Express.Multer.File,
    fileSaveDto: FileSaveDto,
  ): Promise<FileEntity | void> {
    AWS.config.update({
      accessKeyId: this.configService.get('AWS_SES_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SES_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_SES_REGION'),
    });

    const s3 = new AWS.S3();
    const domainName = 'REDACTED_S3_BUCKET_2';
    const path = '/REDACTED_S3_PATH_3';
    const fileName = uuidv4();
    let key = `${path}/${fileName}`;
    key = key.replace(/\/\//gi, '/');
    key = key.slice(1, key.length);

    const param = {
      Bucket: domainName,
      Body: file.buffer,
      Key: key,
    };

    const resultUrl = `https://${domainName}/${key}`;

    let uploadFileTarget: FileEntity;

    try {
      const stored = await s3.upload(param).promise();

      const uploadFile = new FileEntity();
      uploadFile.userId = fileSaveDto.userId;
      uploadFile.url = `https://${domainName}/${stored.Key}`;
      uploadFile.originalName = file.originalname;
      uploadFile.encoding = file.encoding;
      uploadFile.mimetype = file.mimetype;
      uploadFile.size = file.size;
      uploadFile.bucket = stored.Bucket;
      uploadFile.key = stored.Key;
      uploadFile.location = stored.Location;
      uploadFile.etag = stored.ETag;
      uploadFile.createdAt = new Date();

      uploadFileTarget = uploadFile;
    } catch (e) {
      throw new HttpException(
        {
          error: e,
          message: '파일 저장에 실패했습니다',
        },
        500,
      );
    }

    const uploadedFiles = await this.fileRepository.save(uploadFileTarget);

    if (!uploadedFiles) {
      throw new HttpException({ message: '파일 엔티티 저장 실패' }, 500);
    }

    return uploadedFiles;
  }

  async fileSave(
    files: Array<Express.Multer.File>,
    fileSaveDto: FileSaveDto,
  ): Promise<FileEntity> {
    console.log('upload file : ', files);

    AWS.config.update({
      accessKeyId: this.configService.get('AWS_SES_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SES_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_SES_REGION'),
    });
    const s3 = new AWS.S3();
    const domainName = 'REDACTED_S3_BUCKET_2';

    const path = '/REDACTED_S3_PATH_3';

    const fileName = uuidv4();
    let key = `${path}/${fileName}`;

    key = key.replace(/\/\//gi, '/');
    key = key.slice(1, key.length);

    const param = {
      Bucket: domainName,
      Body: files[0].buffer,
      Key: key,
    };

    const resultUrl = `https://${domainName}/${key}`;

    console.log('resultUrl : ', resultUrl);

    let uploadFileTarget: FileEntity;

    try {
      const stored = await s3.upload(param).promise();

      const uploadFile = new FileEntity();
      uploadFile.userId = fileSaveDto.userId;
      uploadFile.url = `https://${domainName}/${stored.Key}`;
      uploadFile.originalName = files[0].originalname;
      uploadFile.encoding = files[0].encoding;
      uploadFile.mimetype = files[0].mimetype;
      uploadFile.size = files[0].size;
      uploadFile.bucket = stored.Bucket;
      uploadFile.key = stored.Key;
      uploadFile.location = stored.Location;
      uploadFile.etag = stored.ETag;
      uploadFile.createdAt = new Date();

      uploadFileTarget = uploadFile;
    } catch (e) {
      throw new HttpException(
        {
          error: e,
          message: '파일 저장에 실패했습니다',
        },
        500,
      );
    }

    const uploadedFiles = await this.fileRepository.save(uploadFileTarget);

    console.log('uploaded file : ', uploadedFiles);

    /** @todo 어느 메뉴에서 파일 업로드 했는지 구분 추가 */

    if (!uploadedFiles) {
      throw new HttpException({ message: '파일 엔티티 저장 실패' }, 500);
    }

    return uploadedFiles;
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(
    private configService: ConfigService,
    private fileRepository: Repository<File>,
  ) {}

  async fileSave(): Promise<void> {}
}

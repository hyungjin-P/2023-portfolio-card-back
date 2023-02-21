import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FileSaveDto {
  @ApiProperty({ default: 'cba1a1c5-eefa-4926-ba04-1331d3659c14' })
  @IsString()
  userId: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}

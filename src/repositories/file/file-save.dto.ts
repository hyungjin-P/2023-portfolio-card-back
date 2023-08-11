import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FileSaveDto {
  @ApiProperty()
  @IsString()
  authorId: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}

import { AuthorProfile } from './author-profile.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorProfileCreateDto extends AuthorProfile {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'author record id',
  })
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'profile avatar image path',
  })
  profileImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'phone number',
  })
  phoneNumber: string;

  @IsString()
  @ApiProperty({
    description: 'email',
  })
  email: string;
}

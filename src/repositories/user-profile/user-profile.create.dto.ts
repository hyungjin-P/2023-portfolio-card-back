import { UserProfile } from './user-profile.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserProfileCreateDto extends UserProfile {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'user record id',
  })
  userId: string;

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

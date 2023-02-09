import { UserProfile } from './user-profile.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileCreateDto extends UserProfile {
  @ApiProperty({
    description: 'user record id',
  })
  userId: string;

  @ApiProperty({
    description: 'profile avatar image path',
  })
  profileImageUrl: string;

  @ApiProperty({
    description: 'phone number',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'email',
  })
  email: string;
}

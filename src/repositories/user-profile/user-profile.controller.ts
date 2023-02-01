import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('userProfile')
@ApiTags('사용자 프로필')
export class UserProfileController {}

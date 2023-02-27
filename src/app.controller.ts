import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('API 문서 뷰')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getHello(): any {
    return { message: 'dev' };
  }

  @Get('/test/ex1')
  getTest01(): any {
    return { message: 'test test ' };
  }
}

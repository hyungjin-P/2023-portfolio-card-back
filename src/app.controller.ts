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

  @Get('/test/ex2')
  getTest02(): any {
    return { message: 'test2 test2 ' };
  }

  @Get('/test/ex3')
  getTest03(): any {
    return { message: 'test3 test3 ' };
  }

  @Get('/test/ex4')
  getTest04(): any {
    return { message: 'test4 test4 ' };
  }
}

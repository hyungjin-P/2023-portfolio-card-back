import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getHello(): any {
    return { message: 'dev' };
  }

}

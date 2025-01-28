import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpResponse } from './shared/interfaces/HttpResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): HttpResponse {
    return this.appService.getHello();
  }
}

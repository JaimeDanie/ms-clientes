import { Injectable } from '@nestjs/common';
import { HttpResponse } from './shared/interfaces/HttpResponse';

@Injectable()
export class AppService {
  getHello(): HttpResponse {
    return { success: true, message:'Service is available'};
  }
}

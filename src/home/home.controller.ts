import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HomeService } from './home.service';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  @Render('index')
  async home() {
    const data = await this.service.appInfo();
    return { 
      message: 'Welcome to Data Trader Premium',
      ...data
    };
  }

  @Get('/api/info')
  appInfo() {
    return this.service.appInfo();
  }
}

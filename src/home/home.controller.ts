import { Controller, Get, Res, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

import { HomeService } from './home.service';
import { ViewService } from '../view/view.service';
import { ThemeService } from '../view/theme.service';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(
    private service: HomeService,
    private viewService: ViewService,
    private themeService: ThemeService,
  ) {}

  @Get()
  async home(@Req() req: Request, @Res() res: Response) {
    const data = await this.service.appInfo();
    const theme = this.themeService.getTheme(req);
    
    this.viewService.configure(theme);
    
    const html = await this.viewService.render('pages/home.njk', {
      title: 'Data Trader Premium',
      message: 'Welcome to Data Trader Premium',
      ...data,
    });
    
    res.send(html);
  }

  @Get('/pricing')
  async pricing(@Req() req: Request, @Res() res: Response) {
    const data = await this.service.appInfo();
    const theme = this.themeService.getTheme(req);
    
    this.viewService.configure(theme);
    
    const html = await this.viewService.render('pages/pricing.njk', {
      title: 'Pricing - Data Trader Premium',
      message: 'Choose your plan',
      ...data,
    });
    
    res.send(html);
  }

  @Get('/api/info')
  appInfo() {
    return this.service.appInfo();
  }
}

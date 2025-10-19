import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ThemeService } from '../view/theme.service';
import { ViewService } from '../view/view.service';

@Controller('web')
export class WebController {
  constructor(
    private readonly themeService: ThemeService,
    private readonly view: ViewService,
  ) {}

  @Get('home')
  async home(@Req() req: Request, @Res() res: Response) {
    const theme = this.themeService.getTheme(req);
    this.view.configure(theme);
    const html = await this.view.render('pages/home.njk', {
      title: 'Home Page',
      message:
        'Hello from NestJS Templating with Layouts/Partials/Regions/Theme',
      // Example regions: header-banner, sidebar
      __regions: {
        'header-banner': 'Welcome Banner from Controller',
      },
      theme,
    });
    res.type('html').send(html);
  }
}

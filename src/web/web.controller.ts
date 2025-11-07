import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ThemeService } from '../view/theme.service';
import { ViewService } from '../view/view.service';
import { TestimonialsService } from '../testimonials/testimonials.service';

@Controller('web')
export class WebController {
  constructor(
    private readonly themeService: ThemeService,
    private readonly view: ViewService,
    private readonly testimonialsService: TestimonialsService,
  ) {}

  @Get('home')
  async home(@Req() req: Request, @Res() res: Response) {
    const theme = this.themeService.getTheme(req);
    this.view.configure(theme);
    const navLinks = [
      { href: '#features', label: 'Features' },
      { href: '#track-record', label: 'Track Record' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#testimonials', label: 'Testimonials' },
      { href: '#faq', label: 'FAQ' },
    ];

    // Fetch active testimonials
    const testimonials = await this.testimonialsService.findAllActive();

    const html = await this.view.render('pages/home.njk', {
      title: 'Home Page',
      message:
        'Hello from NestJS Templating with Layouts/Partials/Regions/Theme',
      // Example regions: header-banner, sidebar
      __regions: {
        'header-banner': 'Welcome Banner from Controller',
      },
      // additional template variables useful across pages
      navLinks,
      testimonials,
      currentYear: new Date().getFullYear(),
      meta: {
        description: 'Premium trade alerts, analysis and education for traders',
        keywords: 'trading, signals, crypto, forex, stocks',
      },
      user: null, // populate when you implement auth
      theme,
    });
    res.type('html').send(html);
  }
}

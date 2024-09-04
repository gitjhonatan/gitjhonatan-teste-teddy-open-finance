import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:token')
  async getUrl(
    @Param('token') token: string,
    @Res() res: Response,
  ): Promise<void> {
    const url = await this.appService.getUrl(token);

    res.redirect(url);
  }
}

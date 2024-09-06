import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('redirect')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'URL shorten' })
  @ApiParam({
    name: 'token',
    type: 'string',
    description: 'Shortened URL token',
  })
  @Get('/:token')
  async getUrl(
    @Param('token') token: string,
    @Res() res: Response,
  ): Promise<void> {
    const url = await this.appService.getUrl(token);

    res.redirect(url);
  }
}

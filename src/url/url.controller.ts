import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async get(@Request() req) {
    return await this.urlService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createUrlDto: CreateUrlDto) {
    return await this.urlService.create(req.user?.sub, createUrlDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUrlDto: UpdateUrlDto,
    @Request() req,
  ) {
    return this.urlService.update(req.user?.sub, id, updateUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.urlService.remove(req.user?.sub, id);
  }
}

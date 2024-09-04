import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { DatabaseModule } from 'src/database/database.module';
import { urlProviders } from './url.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UrlController],
  providers: [...urlProviders, UrlService],
  exports: [...urlProviders],
})
export class UrlModule {}

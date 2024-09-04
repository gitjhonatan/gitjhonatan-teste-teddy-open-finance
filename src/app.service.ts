import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Url } from './url/entities/url.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}

  async getUrl(token: string): Promise<string> {
    const url = await this.urlRepository.findOneBy({ hash: token });

    if (url?.hash) {
      return url.url_origin;
    }

    throw new NotFoundException('URL not found');
  }
}

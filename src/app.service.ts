import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Url } from './url/entities/url.entity';
import { UrlRequests } from './url/entities/url_requests.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
    @Inject('URL_REQUESTS_REPOSITORY')
    private urlRequestsRepository: Repository<UrlRequests>,
  ) {}

  async getUrl(token: string): Promise<string> {
    const url = await this.urlRepository.findOneBy({ hash: token });

    if (url) {
      const urlRequest = await this.urlRequestsRepository.create({
        url: { id: url.id },
      });

      await this.urlRequestsRepository.save(urlRequest);
      return url.url_origin;
    }

    throw new NotFoundException('URL not found');
  }
}

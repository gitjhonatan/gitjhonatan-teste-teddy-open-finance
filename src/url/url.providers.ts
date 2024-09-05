import { DataSource } from 'typeorm';
import { Url } from './entities/url.entity';
import { UrlRequests } from './entities/url_requests.entity';

export const urlProviders = [
  {
    provide: 'URL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Url),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'URL_REQUESTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UrlRequests),
    inject: ['DATA_SOURCE'],
  },
];

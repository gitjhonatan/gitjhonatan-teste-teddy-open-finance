import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Repository } from 'typeorm';
import { Url } from './url/entities/url.entity';
import { UrlRequests } from './url/entities/url_requests.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppService', () => {
  let service: AppService;
  let urlRepository: Repository<Url>;
  let urlRequestsRepository: Repository<UrlRequests>;

  const mockUrlRepository = {
    findOneBy: jest.fn(),
  };

  const mockUrlRequestsRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const uuid = 'eeb7d063-2c9a-4d1b-aaa2-8d2a1c636f0e';
  const token = 'valid-token';
  const url = { id: uuid, url_origin: 'http://example.com' };
  const urlRequest = { url: { id: uuid } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: 'URL_REQUESTS_REPOSITORY',
          useValue: mockUrlRequestsRepository,
        },
        {
          provide: 'URL_REPOSITORY',
          useValue: mockUrlRepository,
        },
        { provide: getRepositoryToken(Url), useValue: mockUrlRepository },
        {
          provide: getRepositoryToken(UrlRequests),
          useValue: mockUrlRequestsRepository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    urlRepository = module.get<Repository<Url>>(getRepositoryToken(Url));
    urlRequestsRepository = module.get<Repository<UrlRequests>>(
      getRepositoryToken(UrlRequests),
    );
  });

  describe('getUrl', () => {
    it('should return the URL if found', async () => {
      mockUrlRepository.findOneBy.mockResolvedValue(url);
      mockUrlRequestsRepository.create.mockReturnValue(urlRequest);
      mockUrlRequestsRepository.save.mockResolvedValue(urlRequest);

      const result = await service.getUrl(token);
      expect(result).toBe(url.url_origin);
      expect(mockUrlRepository.findOneBy).toHaveBeenCalledWith({ hash: token });
      expect(mockUrlRequestsRepository.create).toHaveBeenCalledWith({
        url: { id: uuid },
      });
      expect(mockUrlRequestsRepository.save).toHaveBeenCalledWith(urlRequest);
    });

    it('should throw NotFoundException if URL is not found', async () => {
      mockUrlRepository.findOneBy.mockResolvedValue(null);

      await expect(service.getUrl(token)).rejects.toThrow(NotFoundException);
      expect(mockUrlRepository.findOneBy).toHaveBeenCalledWith({ hash: token });
    });
  });
});

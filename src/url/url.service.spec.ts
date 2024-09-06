import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

const randomHash = 'MOHhlZ';

describe('UrlService', () => {
  let urlService: UrlService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let urlRepository: Repository<Url>;
  const uuid = '2253bc85-936b-483d-a799-68ef4dcbc728';

  const mockUrlRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    softRemove: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: 'URL_REPOSITORY',
          useValue: mockUrlRepository,
        },
        {
          provide: getRepositoryToken(Url),
          useValue: mockUrlRepository,
        },
      ],
    }).compile();

    urlService = module.get<UrlService>(UrlService);
    urlRepository = module.get<Repository<Url>>(getRepositoryToken(Url));
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(urlService).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new URL', async () => {
      const createUrlDto: CreateUrlDto = { url_origin: 'http://example.com' };
      const userId = uuid;

      mockUrlRepository.findOneBy.mockResolvedValueOnce(null); // No hash collision
      mockUrlRepository.create.mockReturnValue(createUrlDto);
      mockUrlRepository.save.mockResolvedValue({
        ...createUrlDto,
        hash: randomHash,
      });

      const result = await urlService.create(userId, createUrlDto);

      expect(mockUrlRepository.create).toHaveBeenCalledWith({
        ...createUrlDto,
        hash: expect.any(String),
        user: { id: userId },
      });
      expect(result.newUrl).toContain(randomHash);
    });
  });

  describe('findAll', () => {
    it('should return all URLs with request counts', async () => {
      const userId = uuid;
      const urls = [
        { id: '1', url_origin: 'http://example.com', requests: [{}, {}] },
      ];
      mockUrlRepository.find.mockResolvedValue(urls);

      const result = await urlService.findAll(userId);

      expect(mockUrlRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: { requests: true },
      });
      expect(result[0].requests).toBe(2);
    });
  });

  describe('update', () => {
    it('should update a URL if it exists and belongs to the user', async () => {
      const updateUrlDto: UpdateUrlDto = { url_origin: 'http://newurl.com' };
      const userId = uuid;
      const id = '1';
      const existingUrl = { id: '1', user: { id: userId } };

      mockUrlRepository.findOne.mockResolvedValue(existingUrl);

      const result = await urlService.update(userId, id, updateUrlDto);

      expect(mockUrlRepository.update).toHaveBeenCalledWith(id, updateUrlDto);
      expect(result.message).toBe('URL updated successfully');
    });

    it('should throw NotFoundException if URL does not exist', async () => {
      mockUrlRepository.findOne.mockResolvedValue(null);

      await expect(
        urlService.update(uuid, '1', { url_origin: 'http://newurl.com' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a URL if it exists and belongs to the user', async () => {
      const userId = uuid;
      const id = '1';
      const existingUrl = { id: '1', user: { id: userId } };

      mockUrlRepository.findOne.mockResolvedValue(existingUrl);

      const result = await urlService.remove(userId, id);

      expect(mockUrlRepository.softRemove).toHaveBeenCalledWith(existingUrl);
      expect(result.message).toBe('URL deleted successfully');
    });

    it('should throw NotFoundException if URL does not exist', async () => {
      mockUrlRepository.findOne.mockResolvedValue(null);

      await expect(
        urlService.remove(uuid, '2253bc85-936b-483d-a799-68ef4dcbc728'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});

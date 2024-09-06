import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

describe('UrlController', () => {
  const uuid = '2253bc85-936b-483d-a799-68ef4dcbc728';

  let controller: UrlController;
  let service: UrlService;

  const mockUrlService = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [
        {
          provide: UrlService,
          useValue: mockUrlService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UrlController>(UrlController);
    service = module.get<UrlService>(UrlService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should call findAll method of UrlService', async () => {
      const req = { user: { sub: uuid } };
      await controller.get(req);
      expect(service.findAll).toHaveBeenCalledWith(uuid);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should call create method of UrlService with correct parameters', async () => {
      const req = { user: { sub: uuid } };
      const createUrlDto: CreateUrlDto = { url_origin: 'http://example.com' };
      await controller.create(req, createUrlDto);
      expect(service.create).toHaveBeenCalledWith(uuid, createUrlDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call update method of UrlService with correct parameters', async () => {
      const req = { user: { sub: uuid } };
      const updateUrlDto: UpdateUrlDto = { url_origin: 'http://newurl.com' };
      const id = '123';
      await controller.update(id, updateUrlDto, req);
      expect(service.update).toHaveBeenCalledWith(uuid, id, updateUrlDto);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should call remove method of UrlService with correct parameters', async () => {
      const req = { user: { sub: uuid } };
      const id = '637a790a-cc6c-4fcc-93ed-8aa30a5daf47';
      await controller.remove(id, req);
      expect(service.remove).toHaveBeenCalledWith(uuid, id);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});

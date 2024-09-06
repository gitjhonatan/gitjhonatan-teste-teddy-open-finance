import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response } from 'express';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockAppService = {
    getUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getUrl', () => {
    it('should redirect to the correct URL based on the token', async () => {
      const token = 'someToken';
      const mockUrl = 'https://example.com';
      const mockRes = {
        redirect: jest.fn(),
      } as unknown as Response;

      mockAppService.getUrl.mockResolvedValue(mockUrl);

      await appController.getUrl(token, mockRes);

      expect(appService.getUrl).toHaveBeenCalledWith(token);
      expect(mockRes.redirect).toHaveBeenCalledWith(mockUrl);
    });
  });
});

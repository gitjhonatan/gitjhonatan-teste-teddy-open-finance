import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('create', () => {
    const email = 'test@example.com';
    const password = 'password123';
    it('should return a token if credentials are valid', async () => {
      const signInDto = { email: email, password: password };
      const token = 'valid-jwt-token';

      mockAuthService.signIn.mockResolvedValue(token);

      const result = await controller.create(signInDto);
      expect(result).toBe(token);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(
        signInDto.email,
        signInDto.password,
      );
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const signInDto = { email: email, password: password };

      mockAuthService.signIn.mockRejectedValue(
        new UnauthorizedException('Invalid credentials'),
      );

      await expect(controller.create(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockAuthService.signIn).toHaveBeenCalledWith(
        signInDto.email,
        signInDto.password,
      );
    });
  });
});

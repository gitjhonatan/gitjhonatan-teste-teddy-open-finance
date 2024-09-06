import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const uuid = '2253bc85-936b-483d-a799-68ef4dcbc728';
  const email = 'test@example.com';
  const password = 'password123';

  const mockUserService = {
    findOneByEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token when valid credentials are provided', async () => {
      const mockUser = {
        id: uuid,
        email: email,
        password: password,
      };

      mockUserService.findOneByEmail.mockResolvedValue(mockUser);
      mockJwtService.signAsync.mockResolvedValue('someAccessToken');

      const result = await authService.signIn(email, password);

      expect(userService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
      expect(result).toEqual({ access_token: 'someAccessToken' });
    });

    it('should throw UnauthorizedException when the user is not found', async () => {
      mockUserService.findOneByEmail.mockResolvedValue(null);

      await expect(authService.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when the password is incorrect', async () => {
      const mockUser = {
        id: uuid,
        email: email,
        password: password,
      };

      mockUserService.findOneByEmail.mockResolvedValue(mockUser);

      await expect(authService.signIn(email, 'wrongPassword')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});

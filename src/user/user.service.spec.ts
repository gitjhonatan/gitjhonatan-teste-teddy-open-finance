import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const uuid = '2253bc85-936b-483d-a799-68ef4dcbc728';
  const email = 'test@example.com';
  const password = 'password123';

  const mockUserRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user when email does not exist', async () => {
      const createUserDto: CreateUserDto = { email, password };
      const mockUser = { id: uuid, ...createUserDto }; // ID no formato UUID

      mockUserRepository.findOneBy.mockResolvedValue(null); // Simula que o email não existe
      mockUserRepository.create.mockReturnValue(mockUser); // Simula a criação do usuário
      mockUserRepository.save.mockResolvedValue(mockUser); // Simula o salvamento do usuário

      const result = await userService.create(createUserDto);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ id: mockUser.id, email }); // A senha foi excluída
    });

    it('should throw an exception if the user already exists', async () => {
      const createUserDto: CreateUserDto = { email, password };
      const existingUser = { id: uuid, ...createUserDto }; // ID no formato UUID

      mockUserRepository.findOneBy.mockResolvedValue(existingUser); // Simula que o usuário já existe

      await expect(userService.create(createUserDto)).rejects.toThrow(
        new HttpException('User already exists', HttpStatus.CONFLICT),
      );
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const mockUser = { id: uuid, email, password }; // ID no formato UUID

      mockUserRepository.findOneBy.mockResolvedValue(mockUser); // Simula retorno do usuário

      const result = await userService.findOneByEmail(email);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email });
      expect(result).toEqual(mockUser);
    });

    it('should return null if the user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null); // Simula usuário não encontrado

      const result = await userService.findOneByEmail(email);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email });
      expect(result).toBeNull();
    });
  });
});

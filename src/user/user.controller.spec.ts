import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let userCcontroller: UserController;

  const mockUsersService = {
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUsersService }],
    }).compile();

    userCcontroller = module.get<UserController>(UserController);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(userCcontroller).toBeDefined();
  });

  it('create', async () => {
    const userDto: CreateUserDto = {
      email: 'jhon22atan@email.com',
      password: 'root',
    };

    await userCcontroller.create(userDto);

    expect(mockUsersService.create).toHaveBeenCalledTimes(1);
    expect(mockUsersService.create).toHaveBeenCalledWith(userDto);
  });
});

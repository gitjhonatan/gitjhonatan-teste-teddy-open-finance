import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userExists)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    delete user.password;
    return user;
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}

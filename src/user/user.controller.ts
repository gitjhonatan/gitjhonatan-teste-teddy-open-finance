import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Validation error',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email should not be empty',
          'email must be an email address',
          'password should not be empty',
          'password must be a string',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiOperation({ summary: 'Create new user' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}

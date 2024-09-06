import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    },
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Incorrect email or password',
    schema: {
      example: {
        statusCode: 401,
        message: 'Email or password are incorrect',
        error: 'Unauthorized',
      },
    },
  })
  @ApiOperation({ summary: 'Get Bearer Token' })
  @Post('login')
  create(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto.email, authDto.password);
  }
}

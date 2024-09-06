import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'email@email.com',
    description: 'User email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2253bc85-936b-483d',
    description: 'User password',
  })
  password: string;
}

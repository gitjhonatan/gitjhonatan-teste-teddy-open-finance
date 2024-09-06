import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'The URL must be a valid URL' })
  @Matches(/^https?:\/\//, { message: 'The URL must start with http or https' })
  @ApiProperty({
    example: 'http://example.com/',
    description: 'Url to shorten',
  })
  url_origin: string;
}

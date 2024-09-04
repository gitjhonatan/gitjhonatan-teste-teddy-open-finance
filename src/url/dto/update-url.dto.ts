import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'The URL must be a valid URL' })
  @Matches(/^https?:\/\//, { message: 'The URL must start with http or https' })
  url_origin: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from '../../entities/base.entity';
import { Url } from '../../url/entities/url.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';

@Entity({ name: 'user', schema: 'url_shortner' })
export class User extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ nullable: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Url, (url) => url.user, { cascade: ['remove'] })
  urls: Url[];
}

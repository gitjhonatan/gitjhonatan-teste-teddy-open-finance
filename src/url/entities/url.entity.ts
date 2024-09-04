import { BaseModel } from 'src/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'url', schema: 'url_shortner' })
export class Url extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  hash: string;

  @Column({ nullable: false })
  url_origin: string;

  @ManyToOne(() => User, (user) => user.urls, { onDelete: 'CASCADE' })
  user: User;
}

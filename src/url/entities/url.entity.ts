import { BaseModel } from '../../entities/base.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UrlRequests } from './url_requests.entity';

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

  @OneToMany(() => UrlRequests, (urlRequests) => urlRequests.url, {
    cascade: ['remove'],
  })
  @JoinColumn()
  requests: UrlRequests[];
}

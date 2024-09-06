import { BaseModel } from '../../entities/base.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Url } from './url.entity';

@Entity({ name: 'url_requests', schema: 'url_shortner' })
export class UrlRequests extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Url, (url) => url.requests, { onDelete: 'CASCADE' })
  url: Url;
}

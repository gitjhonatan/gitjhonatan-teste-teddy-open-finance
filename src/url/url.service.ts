import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto) {
    const charPossible =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let hash = '';

    for (let i = 0; i < 6; i++) {
      hash += charPossible.charAt(
        Math.floor(Math.random() * charPossible.length),
      );
    }

    const url = await this.urlRepository.create({ ...createUrlDto, hash });
    const urlSaved = await this.urlRepository.save(url);

    return { ...urlSaved, newUrl: 'http://localhost/' + urlSaved.hash };
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

 async update(id: string, updateUrlDto: UpdateUrlDto) {
    const updated = await this.urlRepository.update(id, updateUrlDto);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.urlRepository.softRemove({ id });
    return deleted;
  }
}

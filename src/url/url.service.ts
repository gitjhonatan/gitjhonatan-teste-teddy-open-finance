import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';
import constants from 'src/config/constants';

@Injectable()
export class UrlService {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}

  async create(userId: string, createUrlDto: CreateUrlDto) {
    const charPossible =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let hash = '';

    for (let i = 0; i < 6; i++) {
      hash += charPossible.charAt(
        Math.floor(Math.random() * charPossible.length),
      );
    }

    const url = await this.urlRepository.create({
      ...createUrlDto,
      hash,
      user: userId?.length ? { id: userId } : {},
    });
    const urlSaved = await this.urlRepository.save(url);

    return {
      ...urlSaved,
      newUrl: `${constants.APP_URL}/${urlSaved.hash}`,
    };
  }

  async findAll(userId: string) {
    // const teste = await this.urlRepository.findBy({ user: { id: userId } });
    const teste = await this.urlRepository.find({
      where: { user: { id: userId } },
      relations: {
        requests: true,
      },
    });

    const otoTeste = teste.map((t) => {
      return { ...t, requests: t.requests.length };
    });
    return otoTeste;
  }

  async update(sub: string, id: string, updateUrlDto: UpdateUrlDto) {
    const url = await this.urlRepository.findOne({
      where: {
        id: id,
        user: { id: sub },
      },
    });

    if (!url) {
      throw new NotFoundException(
        'URL not found or you do not have permission to update it',
      );
    }

    await this.urlRepository.update(id, updateUrlDto);

    return { message: 'URL updated successfully' };
  }

  async remove(sub: string, id: string) {
    const url = await this.urlRepository.findOne({
      where: {
        id: id,
        user: { id: sub },
      },
    });

    if (!url) {
      throw new NotFoundException(
        'URL not found or you do not have permission to delete it',
      );
    }

    await this.urlRepository.softRemove(url);

    return { message: 'URL deleted successfully' };
  }
}

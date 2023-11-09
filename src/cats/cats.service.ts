import { Injectable } from '@nestjs/common';
import { CatEntity } from './cats.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CatsService {
  private readonly catsRepository: Repository<CatEntity>;

  constructor(
    @InjectDataSource()
    private readonly _connection: DataSource,
  ) {
    this.catsRepository = this._connection.getRepository(CatEntity);
  }

  public async create() {
    return this.catsRepository.save({ name: 'Ryan Gosling' });
  }
}

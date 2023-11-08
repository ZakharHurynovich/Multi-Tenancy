import { Inject, Injectable } from '@nestjs/common';
import { DatabaseTypes } from 'src/app.types';
import { DataSource, Repository } from 'typeorm';
import { CatEntity } from './cats.entity';

@Injectable()
export class CatsService {
  private readonly catsRepository: Repository<CatEntity>;

  constructor(
    @Inject(DatabaseTypes.DataSource)
    private readonly _connection: DataSource,
  ) {
    this.catsRepository = this._connection.getRepository(CatEntity);
  }

  public async create() {
    return this.catsRepository.save({ name: 'Ryan Gosling' });
  }
}

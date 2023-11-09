import { Injectable } from '@nestjs/common';
import { TenancyName } from './tenancy.enum';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CatEntity } from 'src/cats/cats.entity';

@Injectable()
export default class TenancyService {
  private getDatabaseConfig(name: TenancyName) {
    const databaseConfig = {
      type: 'postgres',
      host: 'localhost',
      entities: [CatEntity],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
    };

    switch (name) {
      case TenancyName.Company1: {
        return {
          ...databaseConfig,
          name: TenancyName.Company1,
          username: TenancyName.Company1,
          password: TenancyName.Company1,
          database: TenancyName.Company1,
          port: 5433,
          synchronize: true,
        } as DataSourceOptions;
      }
      case TenancyName.Company2: {
        return {
          ...databaseConfig,
          name: TenancyName.Company2,
          username: TenancyName.Company2,
          password: TenancyName.Company2,
          database: TenancyName.Company2,
          port: 5434,
          synchronize: true,
        } as DataSourceOptions;
      }
      case TenancyName.Company3: {
        return {
          ...databaseConfig,
          name: TenancyName.Company3,
          username: TenancyName.Company3,
          password: TenancyName.Company3,
          database: TenancyName.Company3,
          port: 5435,
          synchronize: true,
        } as DataSourceOptions;
      }

      default: {
        return null;
      }
    }
  }

  public async connection(name: TenancyName) {
    const databaseConfig = this.getDatabaseConfig(name);

    const dataSourse = new DataSource(databaseConfig);

    if (!dataSourse) {
      throw new Error('Database configuration not found');
    }

    return dataSourse.initialize();
  }
}

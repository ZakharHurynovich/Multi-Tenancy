import { REQUEST } from '@nestjs/core';
import { DatabaseTypes } from 'src/app.types';
import { getDatabaseConfig } from './tenancy.utils';
import { TenancyName } from './tenancy.enum';
import { DataSource } from 'typeorm';

export default function databaseProvider() {
  return {
    provide: DatabaseTypes.DataSource,
    useFactory: async (request: Request) => {
      const header = request.headers['x-tenant-name'] as TenancyName;

      const databaseConfig = getDatabaseConfig(header);

      const dataSourse = new DataSource(databaseConfig);

      if (!dataSourse) {
        throw new Error('Database configuration not found');
      }

      return dataSourse.initialize();
    },
    inject: [REQUEST],
  };
}

import { Global, Module } from '@nestjs/common';
import { DatabaseTypes } from 'src/app.types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenancyName } from './tenancy.enum';
import TenancyService from './tenancy.service';
import { REQUEST } from '@nestjs/core';

@Global()
@Module({
  imports: [TypeOrmModule],
  controllers: [],
  providers: [
    {
      provide: DatabaseTypes.DataSource,
      useFactory: async (request: Request) => {
        const header = request.headers['x-tenant-name'] as TenancyName;

        return new TenancyService().connection(header);
      },
      inject: [REQUEST],
    },
    TenancyService,
  ],
  exports: [DatabaseTypes.DataSource],
})
export class TenancyModule {}

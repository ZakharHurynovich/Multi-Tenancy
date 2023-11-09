import { Module } from '@nestjs/common';
import { TenancyModule } from 'src/tenancy/tenancy.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { getDataSourceToken } from '@nestjs/typeorm';
import { TenancyDatabase } from 'src/tenancy/tenancy.enum';
import { REQUEST } from '@nestjs/core';
import { injectDatabaseConnection } from 'src/tenancy/tenancy.utils';

@Module({
  imports: [TenancyModule],
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useFactory: injectDatabaseConnection(CatsService),
      inject: [
        REQUEST,
        getDataSourceToken(TenancyDatabase.Database1),
        getDataSourceToken(TenancyDatabase.Database2),
        getDataSourceToken(TenancyDatabase.Database3),
      ],
    },
  ],
  exports: [],
})
export class CatsModule {}

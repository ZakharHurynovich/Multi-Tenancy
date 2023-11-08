import { Global, Module } from '@nestjs/common';
import { DatabaseTypes } from 'src/app.types';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseProvider from './tenancy.provider';

@Global()
@Module({
  imports: [TypeOrmModule],
  controllers: [],
  providers: [databaseProvider()],
  exports: [DatabaseTypes.DataSource],
})
export class TenancyModule {}

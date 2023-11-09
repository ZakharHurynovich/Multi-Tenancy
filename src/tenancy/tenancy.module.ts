import { Global, Module } from '@nestjs/common';
import TenancyFactory from './tenancy.factory';
import { TenancyDatabase } from './tenancy.enum';
@Global()
@Module({
  imports: [
    TenancyFactory.get(TenancyDatabase.Database1),
    TenancyFactory.get(TenancyDatabase.Database2),
    TenancyFactory.get(TenancyDatabase.Database3),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class TenancyModule {}

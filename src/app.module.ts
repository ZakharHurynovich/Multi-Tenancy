import { Module } from '@nestjs/common';
import { TenancyModule } from './tenancy/tenancy.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule, TenancyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

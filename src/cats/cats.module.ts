import { Module } from '@nestjs/common';
import { TenancyModule } from 'src/tenancy/tenancy.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [TenancyModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [],
})
export class CatsModule {}

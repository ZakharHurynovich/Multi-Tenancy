import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from 'src/cats/cats.entity';
import { TenancyDatabase } from './tenancy.enum';

type EnvType = 'name' | 'port';

class TenancyFactory {
  private readonly name: string = 'COMPANY';
  private readonly port: string = 'COMPANY_PORT';

  public getDatabaseEnv(name: string, type: EnvType) {
    return `${this[type]}_${name}`;
  }

  public get(name: TenancyDatabase) {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name,
      useFactory: (configService: ConfigService) => {
        const databaseEnvName = this.getDatabaseEnv(name, 'name');
        const databaseEnvPort = this.getDatabaseEnv(name, 'port');

        return {
          type: 'postgres',
          host: 'localhost',
          entities: [CatEntity],
          migrationsTableName: 'migration',
          migrations: ['src/migration/*.ts'],
          name: configService.get(databaseEnvName),
          username: configService.get(databaseEnvName),
          password: String(configService.get(databaseEnvName)),
          database: configService.get(databaseEnvName),
          port: configService.get(databaseEnvPort),
          synchronize: true,
        };
      },
      inject: [ConfigService],
    });
  }
}

export default new TenancyFactory();

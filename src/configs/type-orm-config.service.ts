import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  logging: boolean = this.configService.get('DATABASE_QUERY_LOGGING');

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      namingStrategy: new SnakeNamingStrategy(),
      type: 'postgres',
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      host: this.configService.get('DATABASE_HOST'),
      port: Number(this.configService.get('DATABASE_PORT')),
      database: this.configService.get('DATABASE_SCHEMA'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      synchronize: this.configService.get('DATABASE_SYNCHRONIZE'),
      logging: this.logging,
    };
  }
}

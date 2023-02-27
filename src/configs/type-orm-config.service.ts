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
      logging: this.logging,
      namingStrategy: new SnakeNamingStrategy(),
      type: 'mysql',
      autoLoadEntities: true,
      synchronize: false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      timezone: 'Z',
      port: this.configService.get('DATABASE_PORT'),
      database: this.configService.get('DATABASE_SCHEMA'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      host: this.configService.get('DATABASE_HOST'),
    };
  }
}

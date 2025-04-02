import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'halloween',
  database: 'HeavyHire',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
};

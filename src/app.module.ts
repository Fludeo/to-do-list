import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './module/auth/auth.module';
import { TaskModule } from './module/task/task.module';
import { UserModule } from './module/user/user.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
@Module({
  imports: [
    AuthModule,
    UserModule,
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'better-sqlite3',
        database: 'development_database.db',
        synchronize: true,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

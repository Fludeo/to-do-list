import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './module/auth/auth.module';
import { TaskModule } from './module/task/task.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TaskModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'better-sqlite3',
        database: 'development_database.db',
        migrations: ['./data/migration/**/*.ts'],
        synchronize: true,
        autoLoadEntities: true,
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

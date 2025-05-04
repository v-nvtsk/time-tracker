import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './app.configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './types';
import { TimeTrackerEntities } from './app/entities';
import { TimeTrackerModules } from './app/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath:
        process.env.NODE_ENV !== 'development' ? '.env' : '.env.local',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database');
        const isDev = process.env.NODE_ENV === 'development';

        if (!dbConfig) {
          throw new Error('Database configuration for TimeTracker not found');
        }
        return {
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: TimeTrackerEntities,
          synchronize: isDev,
          migrationsRun: !isDev,
          migrations: ['dist/migrations/*.js'],
        };
      },
      inject: [ConfigService],
    }),
    ...TimeTrackerModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

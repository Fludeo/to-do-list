import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();
export enum ENVIRONMENTS {
  DEVELOPMENT = 'development',
  AUTOMATED_TEST = 'test',
}

const development: DataSourceOptions = {
  type: 'better-sqlite3',
  database: 'data/developmentDb/development.db',
  migrations: ['./data/migration/**/*.ts'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

const automatedTests: DataSourceOptions = {
  type: 'better-sqlite3',
  database: `data/testDb/tests.${Math.random()}.db`,
  migrations: ['./data/migration/**/*.ts'],
  synchronize: false,
  dropSchema: false,
  namingStrategy: new SnakeNamingStrategy(),
  verbose: console.log,
};

export const datasourceOptions: DataSourceOptions = (() => {
  if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
    return development;
  }

  if (process.env.NODE_ENV === ENVIRONMENTS.AUTOMATED_TEST) {
    return automatedTests;
  }

  throw new Error('No environment defined');
})();

export default new DataSource({
  ...datasourceOptions,
  entities: [join(__dirname, 'src/**/infrastructure/*.schema.ts')],
});

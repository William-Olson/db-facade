import { Options, Sequelize, QueryInterface } from 'sequelize';

import Umzug from 'umzug';

export interface IDbLayerConfig {
  dialectType?: DialectTypes;
  databaseCredentials?: IDbAuthConfig;
  dbConnectionString?: string;
  migrationOptions: IMigrationConfig;
  logging?: boolean;
  sequelizeOptions?: Options;
}

export enum DialectTypes {
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
  MARIADB = 'mariadb',
  SQLITE = 'sqlite',
  MSSQL = 'mssql',
  // DB2 = 'db2',
  // SNOWFLAKE = 'snowflake'
}

export interface IDbAuthConfig {
  database?: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number;
}

export type DbLayerClient = Sequelize;

export interface IMigrationConfig {
  sequelize?: Sequelize;
  migrationsPath?: string;
  migrationTableName?: string;
  migrations?: IMigrationDefinition[];
  logging?: boolean;
}

export interface IMigration {
  name: string;
}

export interface IMigrationDefinition extends IMigration {
  up: (queryInterface: QueryInterface) => Promise<any>;
  down: (queryInterface: QueryInterface) => Promise<any>;
}

export interface IMigrationService {
  runMigrations(): Promise<void>;
  getPendingMigrations(): Promise<IMigration[]>;
  getCompletedMigrations(): Promise<IMigration[]>;
  rollbackLastMigration(): Promise<void>;
}

export type IModelInitializerFn = (
  sequelize: Sequelize
) => void | Promise<void>;
export type ISequelizeFactory = (Sequelize: any) => Sequelize;
export type IUmzugFactory = (sequelize: Sequelize) => Umzug.Umzug;

export interface IConnectionService {
  authenticate(): Promise<void>;
  getClient(): DbLayerClient;
}

export interface IDbLayer extends IConnectionService, IMigrationService {
  initialize(init: IModelInitializerFn): Promise<void>;
}

export const DEFAULT_SQLITE_OPTIONS: Options = {
  dialect: 'sqlite',
  storage: ':memory:',
};

export const DEFAULT_MYSQL_OPTIONS: Options = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
};

export const DEFAULT_MARIADB_OPTIONS: Options = {
  dialect: 'mariadb',
  host: 'localhost',
  port: 3306,
};

export const DEFAULT_POSTGRES_OPTIONS: Options = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
};

export const DEFAULT_MSSQL_OPTIONS: Options = {
  dialect: 'mssql',
  host: 'localhost',
  port: 1433,
};

export const sequelizeDefaultOptions: Map<DialectTypes, Options> = new Map<
  DialectTypes,
  Options
>([
  [DialectTypes.MYSQL, DEFAULT_MYSQL_OPTIONS],
  [DialectTypes.MARIADB, DEFAULT_MARIADB_OPTIONS],
  [DialectTypes.POSTGRES, DEFAULT_POSTGRES_OPTIONS],
  [DialectTypes.SQLITE, DEFAULT_SQLITE_OPTIONS],
  [DialectTypes.MSSQL, DEFAULT_MSSQL_OPTIONS],
]);

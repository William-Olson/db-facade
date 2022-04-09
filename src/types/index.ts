import Knex from 'knex';
import { Options, Sequelize } from 'sequelize';
import Umzug from 'umzug';

export interface IDbLayerConfig
{
  dialectType: DialectTypes;
  databaseCredentials: IDbAuthConfig;
  migrationOptions: IMigrationConfig;
}

export enum DialectTypes
{
  POSTGRES,
  MYSQL,
  MARIADB,
  SQLITE,
  MSSQL
}

export interface IDbAuthConfig
{
  database?: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number;
}

export type DbLayerClient = Sequelize | Knex;

export interface IMigrationConfig
{
  sequelize?: Sequelize;
  migrationsPath?: string;
  migrationTableName?: string;
}

export interface IMigration
{
  name: string;
}

export interface IMigrationService
{
  runMigrations(): Promise<void>;
  getPendingMigrations(): Promise<IMigration[]>;
  getCompletedMigrations(): Promise<IMigration[]>;
  rollbackLastMigration(): Promise<void>;
}

export type IModelInitializerFn = (sequelize: Sequelize) => void;
export type ISequelizeFactory = (Sequelize: any) => Sequelize;
export type IUmzugFactory = (sequelize: Sequelize) => Umzug.Umzug;

export interface IConnectionService
{
  authenticate(): Promise<void>;
  getClient(): DbLayerClient;
}

export interface IDbLayer extends IConnectionService, IMigrationService
{
  initialize(init: IModelInitializerFn): void;
}

export const DEFAULT_SQLITE_OPTIONS: Options = {
  dialect: 'sqlite',
  storage: ':memory:'
}

export const DEFAULT_MYSQL_OPTIONS: Options = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
}

export const DEFAULT_MARIADB_OPTIONS: Options = {
  dialect: 'mariadb',
  host: 'localhost',
  port: 3306
}

export const DEFAULT_POSTGRES_OPTIONS: Options = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
}

export const DEFAULT_MSSQL_OPTIONS: Options = {
  dialect: 'mssql',
  host: 'localhost',
  port: 1433
}

export const sequelizeDefaultOptions: Map<DialectTypes, Options> = new Map<DialectTypes, Options>([
  [ DialectTypes.MYSQL,    DEFAULT_MYSQL_OPTIONS ],
  [ DialectTypes.MARIADB,  DEFAULT_MARIADB_OPTIONS ],
  [ DialectTypes.POSTGRES, DEFAULT_POSTGRES_OPTIONS ],
  [ DialectTypes.SQLITE,   DEFAULT_SQLITE_OPTIONS ],
  [ DialectTypes.MSSQL,    DEFAULT_MSSQL_OPTIONS ]
]);

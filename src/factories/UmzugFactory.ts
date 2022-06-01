import { Sequelize, DataTypes } from "sequelize";
import { IMigrationConfig, IMigrationDefinition } from '../types';
import * as path from 'path';
import type { UmzugOptions, Migration, MigrationOptions, SequelizeStorageOptions } from 'umzug';
import umzug from 'umzug';


export class UmzugFactory
{
  public static newInstance(options: IMigrationConfig): umzug.Umzug
  {
    if (!options.sequelize) {
      throw new Error('Missing sequelize instance in IMigrationOptions. ' +
                      'Unable to create Umzug instance.');
    }
    return new umzug(UmzugFactory.getFullDefaultOptions(options));
  }

  public static withDirectOptions(umzugOptions: UmzugOptions): umzug.Umzug
  {
    return new umzug(umzugOptions);
  }

  public static getFullDefaultOptions(opts: IMigrationConfig): UmzugOptions
  {
    let migrationOptions: Migration[] | MigrationOptions = {
      params: [ opts.sequelize?.getQueryInterface(), Sequelize ],
      path: opts.migrationsPath || path.join(process.cwd(), 'migrations')
    } as MigrationOptions;

    if (opts.migrations && opts.migrations.length) {
      migrationOptions = opts.migrations.map((migration: IMigrationDefinition) => {
        return {
          file: migration.name,
          up: () => migration.up(opts.sequelize?.getQueryInterface()!),
          down: () => migration.down(opts.sequelize?.getQueryInterface()!),
          migration: () => Promise.resolve(migration),
          testFileName: (needle: string) => needle === migration.name
        };
      });
    }

    const sequelizeOptions: Partial<SequelizeStorageOptions> = {
      sequelize: opts.sequelize!,
      columnName: 'name',
      tableName: opts.migrationTableName || '_Migrations_',
      columnType: DataTypes.STRING,
    };

    return {
      storage: 'sequelize',
      storageOptions: sequelizeOptions,
      migrations: migrationOptions,
      logging: !!opts.logging
    };
  }

}

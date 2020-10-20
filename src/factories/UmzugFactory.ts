import { Sequelize } from "sequelize";
import { IMigrationConfig } from '../types';
import * as path from 'path';
import Umzug, { UmzugOptions } from 'umzug';

export class UmzugFactory
{
  public static newInstance(options: IMigrationConfig): Umzug.Umzug
  {
    if (!options.sequelize) {
      throw new Error('Missing sequelize instance in IMigrationOptions. ' +
                      'Unable to create Umzug instance.');
    }
    return new Umzug(UmzugFactory.getFullDefaultOptions(options));
  }

  public static withDirectOptions(umzugOptions: Umzug.UmzugOptions): Umzug.Umzug
  {
    return new Umzug(umzugOptions);
  }

  public static getFullDefaultOptions(opts: IMigrationConfig): UmzugOptions
  {
    return {
      storage: 'sequelize',
      storageOptions: { sequelize: opts.sequelize },
      migrations: {
        params: [ opts.sequelize?.getQueryInterface(), Sequelize ],
        path: opts.migrationsPath || path.join(process.cwd(), 'migrations')
      }
    };
  }

}

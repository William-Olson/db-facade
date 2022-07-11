import { Options, Sequelize } from "sequelize";
import Umzug from "umzug";
import { SequelizeConnectionService } from "../providers/sequelize/SequelizeConnectionService";
import { DbLayer } from "../DbLayer";
import { MigrationService } from "../services/MigrationService";
import { IDbLayerConfig } from "../types";
import { SequelizeFactory } from "./SequelizeFactory";
import { UmzugFactory } from "./UmzugFactory";

export class DbLayerFactory
{
  public static newDbLayer(config: IDbLayerConfig): DbLayer
  {
    const sequelizeOptions: Options = {};
    sequelizeOptions.logging = config.logging;
    let sequelize: Sequelize | undefined;
    if (config.dbConnectionString) {
      sequelize = SequelizeFactory.withUrl(
        config.dbConnectionString,
        config.sequelizeOptions
      );
    }
    else {
      if (!config.databaseCredentials || !config.dialectType) {
        throw new Error("Bad config, credentials & dialect options incomplete");
      }
      sequelize = SequelizeFactory.newInstance(
        config.databaseCredentials,
        config.dialectType,
        sequelizeOptions
      );
    }
    config.migrationOptions.sequelize = sequelize;

    const connection: SequelizeConnectionService = new SequelizeConnectionService(sequelize);
    const migrator: Umzug.Umzug = UmzugFactory.newInstance(config.migrationOptions);
    const migrationService = new MigrationService(migrator);
    return new DbLayer(connection, migrationService);
  }

  public static withDirectOptions(sequelizeOptions: Options, umzugOptions: Umzug.UmzugOptions): DbLayer
  {
    const sequelize: Sequelize = SequelizeFactory.withDirectOptions(sequelizeOptions);
    const connection: SequelizeConnectionService = new SequelizeConnectionService(sequelize);
    const migrator: Umzug.Umzug = UmzugFactory.withDirectOptions(umzugOptions);
    const migrationService = new MigrationService(migrator);
    return new DbLayer(connection, migrationService);
  }
}


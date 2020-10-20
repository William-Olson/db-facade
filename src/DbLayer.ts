import { IDbLayer, IMigration, IMigrationService, IModelInitializerFn } from "./types";
import { ConnectionService } from "./services/ConnectionService";


export class DbLayer implements IDbLayer
{
  private _db: ConnectionService;
  private _migrator: IMigrationService;

  constructor(db: ConnectionService, migrator: IMigrationService)
  {
    this._db = db;
    this._migrator = migrator;
  }

  async runMigrations(): Promise<void> {
    return await this._migrator.runMigrations();
  }

  async getPendingMigrations(): Promise<IMigration[]> {
    return await this._migrator.getPendingMigrations();
  }

  async getCompletedMigrations(): Promise<IMigration[]> {
    return await this._migrator.getCompletedMigrations();
  }

  async rollbackLastMigration(): Promise<void> {
    await this._migrator.rollbackLastMigration();
  }

  get connection(): ConnectionService
  {
    return this._db;
  }

  set connection(instance: ConnectionService)
  {
    this._db = instance;
  }

  async authenticate(): Promise<void> {
    await this._db.authenticate();
  }

  async testConnection(db: ConnectionService): Promise<boolean> {
    try {
      await db.authenticate();
      return true;
    }
    catch {
      return false;
    }
  }

  initialize(init: IModelInitializerFn): void
  {
    init(this._db.sequelize);
  }
}

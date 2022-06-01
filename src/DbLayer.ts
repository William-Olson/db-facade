import { Sequelize } from 'sequelize/types';
import {
  DbLayerClient,
  IConnectionService,
  IDbLayer,
  IMigration,
  IMigrationService,
  IModelInitializerFn,
} from './types';

export class DbLayer implements IDbLayer {
  private _db: IConnectionService;
  private _migrator: IMigrationService;

  constructor(db: IConnectionService, migrator: IMigrationService) {
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

  get connection(): IConnectionService {
    return this._db;
  }

  set connection(instance: IConnectionService) {
    this._db = instance;
  }

  async authenticate(): Promise<void> {
    await this._db.authenticate();
  }

  async getDbVersion(): Promise<string> {
    const client: Sequelize = (await this._db.getClient()) as Sequelize;
    return await client.databaseVersion();
  }

  async testConnection(db: IConnectionService): Promise<boolean> {
    try {
      await db.authenticate();
      return true;
    } catch {
      return false;
    }
  }

  public getClient(): DbLayerClient {
    return this._db.getClient();
  }

  async initialize(init: IModelInitializerFn): Promise<void> {
    await init(this._db.getClient() as Sequelize);
  }

  // initialize(init: IModelInitializerFn): void
  // {
  //   init(this._db.sequelize);
  // }
}

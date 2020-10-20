import Umzug, { Migration } from 'umzug';
import { IMigration, IMigrationService } from '../types';

export class MigrationService implements IMigrationService
{
  private _umzug: Umzug.Umzug;

  constructor(umzugInstance: Umzug.Umzug)
  {
    this._umzug = umzugInstance;
  }

  get umzug(): Umzug.Umzug
  {
    return this._umzug;
  }

  set umzug(instance: Umzug.Umzug)
  {
    this._umzug = instance;
  }

  async runMigrations(): Promise<void>
  {
    await this._umzug.up();
  }

  async getCompletedMigrations(): Promise<IMigration[]>
  {
    const pending: Migration[] = await this._umzug.executed();
    return pending.map((m: Migration) => ({ name: m.file }));
  }

  async getPendingMigrations(): Promise<IMigration[]>
  {
    const pending: Migration[] = await this._umzug.pending();
    return pending.map((m: Migration) => ({ name: m.file }));
  }

  async migrateTo(migration: IMigration): Promise<void>
  {
    await this._umzug.up({ to: migration.name });
  }

  async rollbackTo(migration: IMigration): Promise<void>
  {
    await this._umzug.down({ to: migration.name });
  }

  async rollbackLastMigration(): Promise<void>
  {
    await this._umzug.down();
  }
}

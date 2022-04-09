import Umzug from "umzug";
import Knex from "knex";

const TNAME = '$migrations';

export interface IKnexMigrationStorageOptions
{
  knex: Knex;
  tableName?: string;
}

/*
  Umzug storage for Knex Client Migrations
*/
export class MigrationStorage implements Umzug.Storage
{
  private _knex: Knex;
  private _tableName: string;

  constructor(options: any)
  {
    this._knex = options.knex;
    this._tableName = options.tableName || TNAME;
  }

  async logMigration(migrationName: string): Promise<void> {
      await this._ensureTable();
      await this._knex(this._tableName).insert({ date: new Date(), name: migrationName });
  }

  async unlogMigration(migrationName: string): Promise<void> {
    await this._ensureTable();
    await this._knex(this._tableName).where({ name: migrationName }).del();
  }

  async executed(): Promise<String[]> {
    await this._ensureTable();
    const rows = await this._knex(this._tableName).select();
    return rows.map(m => m.name);
  }

  private async _ensureTable()
  {
    if (await this._knex.schema.hasTable(this._tableName)) {
      return;
    }
    await this._knex.schema.createTable(this._tableName, table => {
      table.text('name').primary();
      table.dateTime('date').notNullable();
    });
  }

};

import { Sequelize } from 'sequelize';
import { IConnectionService } from '../types';

export class ConnectionService implements IConnectionService
{
  private _sequelize: Sequelize;

  constructor(sequelizeInstance: Sequelize)
  {
    this._sequelize = sequelizeInstance;
  }

  get sequelize(): Sequelize
  {
    return this._sequelize;
  }

  set sequelize(instance: Sequelize)
  {
    this._sequelize = instance;
  }

  async authenticate(): Promise<void>
  {
    await this._sequelize.authenticate();
  }

  // async waitForDb(numRetries: number): Promise<void>
  // {
  //   // todo
  // }
}

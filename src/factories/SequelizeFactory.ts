import { Options, Sequelize } from "sequelize";
import {
  DialectTypes,
  IDbAuthConfig,
  sequelizeDefaultOptions
 } from "../types";

export class SequelizeFactory
{

  public static newInstance(creds: IDbAuthConfig, dialect: DialectTypes, opts: Options = {}): Sequelize
  {
    return new Sequelize(
      SequelizeFactory.getFullDefaultOptions(creds, dialect, opts)
    );
  }

  public static withUrl(connectionUrl: string, opts?: Options): Sequelize
  {
    if (!opts) {
      return new Sequelize(connectionUrl);
    }
    return new Sequelize(connectionUrl, opts);
  }

  public static withUrlAndDefaults(connectionUrl: string, dialect: DialectTypes, opts?: Options): Sequelize
  {
    return new Sequelize(connectionUrl, this.getFullDefaultOptions({}, dialect, opts || {}));
  }

  public static withDirectOptions(sequelizeOptions: Options): Sequelize
  {
    return new Sequelize(sequelizeOptions);
  }

  private static getFullDefaultOptions(creds: IDbAuthConfig, dialect: DialectTypes, overrides: Partial<Options>): Options
  {
    const opts: Options = this._combineOptions(sequelizeDefaultOptions.get(dialect)!, overrides);
    return SequelizeFactory._applyCredsToOptions(opts, creds);
  }

  private static _combineOptions(...opts: Options[]): Options
  {
    return Object.assign({ }, ...opts);
  }

  private static _applyCredsToOptions(opts: Options, creds: IDbAuthConfig): Options
  {
    return Object.assign({ }, opts, creds);
  }
}

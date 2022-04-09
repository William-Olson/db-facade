import { Options, Sequelize } from "sequelize";
import {
  DialectTypes,
  IDbAuthConfig,
  sequelizeDefaultOptions
 } from "../types";

export class SequelizeFactory
{
  public static newInstance(creds: IDbAuthConfig, dialect: DialectTypes): Sequelize
  {
    return new Sequelize(
      SequelizeFactory.getFullDefaultOptions(creds, dialect)
    );
  }

  public static withDirectOptions(sequelizeOptions: Options): Sequelize
  {
    return new Sequelize(sequelizeOptions);
  }

  private static getFullDefaultOptions(creds: IDbAuthConfig, dialect: DialectTypes): Options
  {
    return SequelizeFactory._combineOptions(sequelizeDefaultOptions.get(dialect)!, creds);
  }

  private static _combineOptions(opts: Options, creds: IDbAuthConfig): Options
  {
    return Object.assign({ }, opts, creds);
  }
}

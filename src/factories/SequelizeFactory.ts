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
    return SequelizeFactory.combineOptions(sequelizeDefaultOptions.get(dialect)!, creds);
  }

  private static combineOptions(opts: Options, creds: IDbAuthConfig): Options
  {
    return Object.assign({ }, opts, creds);
  }

  public static async test(): Promise<Sequelize>
  {
    const sq = await new Sequelize({
      username: 'dev',
      password: 'dev',
      database: 'dev',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres'
    });
    return sq;
  }
}

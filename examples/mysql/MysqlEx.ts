import { Sequelize } from 'sequelize';
import { DbLayer, DbLayerFactory, DialectTypes } from '../../src';

// TypeScript Migrations Example
// -----------------------------
// Note:
//       Use the `./create-migration <migration-name>` for generating a migration stub.
//
//       In order to use sequelize terminal commands, we added .sequelizerc values and
//       made sure that test-migrations-ts gets transpiled and copied to dist/examples.
//
//       TypeScript Migrations unfortunately have to be imported individually instead of
//       providing a path to where all migration files live.

import MyTestMigration from '../test-migrations-ts/20220406201925-MyTestMigration';
// <---- (we would add other migration file imports here)

const info = (...items: any[]) => console.info('[MysqlExApp]', ...items);

(async function() {

  const dbLayer: DbLayer = DbLayerFactory.newDbLayer({
    dialectType: DialectTypes.MYSQL,
    databaseCredentials: {
      username: 'dev',
      password: 'dev',
      database: 'dev'
    },
    migrationOptions: {
      migrations: [
        MyTestMigration
        // <---- (we would add more migrations entries here once imported)
      ],
      migrationTableName: '__Migrations__'
    }
  });

  info('authenticating db . . .');
  await dbLayer.authenticate();
  info('Success!');
  
  info('running migrations . . .');
  dbLayer.runMigrations();
  
  info('initializing models . . .');
  dbLayer.initialize(async (sequelize: Sequelize) => {
    info(await sequelize.databaseVersion());
  });
  
}());

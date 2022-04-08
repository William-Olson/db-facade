import path from 'path';
import { Sequelize } from 'sequelize';
import { DbLayer, DbLayerFactory, DialectTypes } from '../../src';

const info = (...items: any[]) => console.info('[PostgresEx]', ...items);

(async function() {

  const dbLayer: DbLayer = DbLayerFactory.newDbLayer({
    dialectType: DialectTypes.POSTGRES,
    databaseCredentials: {
      username: 'dev',
      password: 'dev',
      database: 'dev'
    },
    migrationOptions: {
      migrationsPath: path.join(__dirname, 'test-migrations'),
      migrationTableName: '__TestMigrations__'
    }
  });

  info('authenticating db . . .');
  await dbLayer.authenticate();
  info('Success!');
  
  info('running migrations . . .');
  await dbLayer.runMigrations();
  
  info('initializing models . . .');
  await dbLayer.initialize(async (sequelize: Sequelize) => {
    info(await sequelize.databaseVersion());
  });
  
}());

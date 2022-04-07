import path from 'path';
import { Sequelize } from 'sequelize';
import { DbLayer, DbLayerFactory, DialectTypes } from '../../src';

(async function() {

  const dbLayer: DbLayer = DbLayerFactory.newDbLayer({
    dialectType: DialectTypes.MYSQL,
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

  console.log('authenticating db . . .');
  await dbLayer.authenticate();
  console.log('Success!');
  
  console.log('running migrations . . .');
  dbLayer.runMigrations();
  
  console.log('initializing models . . .');
  dbLayer.initialize(async (sequelize: Sequelize) => {
    console.log(await sequelize.databaseVersion());
  });
  
}());

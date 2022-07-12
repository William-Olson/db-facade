import { Sequelize } from 'sequelize';
import { DbLayer, DbLayerFactory, DialectTypes } from '../../dist';
import User from '../test-models/User';

// TypeScript Migrations Example
// -----------------------------
// Notes:
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

(async function () {

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
        // <---- (we would add more migration entries here once imported)
      ],
      migrationTableName: '__Migrations__'
    }
  });

  info('Authenticating db . . .');
  await dbLayer.authenticate();
  info('Success!');

  info('Running migrations . . .');
  await dbLayer.runMigrations();

  info('Initializing models . . .');
  await dbLayer.initialize(async (sequelize: Sequelize) => {
    info(await sequelize.databaseVersion());

    // we made up this method to inject sequelize and can rename it to whatever
    // as long as we define it and call it for each model. The body of the method
    // should invoke the Model's static init method accordingly.
    User.register(sequelize);

    // <---- (we would add associations here)
    // i.e. User.hasMany(Post, { foreignKey: 'creator_id' });

  });
  info('Initialization Complete!');

  info('Creating a user . . .');
  await User.create({
    firstName: 'Test',
    lastName: 'User',
    type: 1,
  });

  info('Logging users . . .');
  console.log(
    (await User.findAll()).map(u => u.toJSON())
  );

}());

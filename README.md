## db-layer

Boiler-plate code and thin wrapper for sequelize and umzug packages.

```
npm i --save umzug sequelize db-layer
```


### Start a database

We can quickly use docker to stand up a new postgres db from scratch for testing with.

```
docker run -it --name pg-db \
    -e POSTGRES_USER=tmp_user \
    -e POSTGRES_PASSWORD=tmp_pass \
    -e POSTGRES_DB=tmp_db \
    -p 5432:5432 \
    -d \
    postgres:9.5
```


### Connect in the code

```TypeScript
import path from 'path';
import { Sequelize } from 'sequelize';
import { DbLayer, DbLayerFactory, DialectTypes } from '../../dist';
import User from '../test-models/User';

const info = (...items: any[]) => console.info('[PostgresEx]', ...items);

(async function() {

  const dbLayer: DbLayer = DbLayerFactory.newDbLayer({
    dialectType: DialectTypes.POSTGRES,
    databaseCredentials: {
      username: 'tmp_user',
      password: 'tmp_pass',
      database: 'tmp_db'
    },
    migrationOptions: {
      migrationsPath: path.join(__dirname, 'app-migrations'),
      migrationTableName: 'app_migrations'
    }
  });

  info('authenticating db . . .');
  await dbLayer.authenticate();
  info('Success!');
  
}());
```


### Run the Migrations

Run the umzug migrations by simply calling `runMigrations()`.

```TypeScript
  info('running migrations . . .');
  await dbLayer.runMigrations();  
```


### Initialize the Models

Pass an initialization function for loading up all your models.

```TypeScript
  info('initializing models . . .');
  await dbLayer.initialize(async (sequelize: Sequelize) => {
    // ensure User.init is invoked in load implementation
    User.load(sequelize);
  });
```

Models are used like normal after initialization.

```TypeScript
import User from '../models/User';

// ...

    // ...
    return await User.findOne({ where: { id } });
```


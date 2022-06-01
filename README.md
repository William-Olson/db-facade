## db-facade

[![npm](https://img.shields.io/npm/v/db-facade?logo=npm)](https://www.npmjs.com/package/db-facade)

Boiler-plate code and thin wrapper for [sequelize](https://www.npmjs.com/package/sequelize) and [umzug](https://www.npmjs.com/package/umzug) packages.

```
npm i --save umzug sequelize db-facade
```

---

### Connect

```TypeScript
import path from 'path';
import { Sequelize } from 'sequelize';
import { DbLayer, DbLayerFactory, DialectTypes } from 'db-facade';

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

  console.info('authenticating db . . .');
  await dbLayer.authenticate();
  console.info('Success!');
  
}());
```


### Run the Migrations

Run the umzug migrations by simply calling `runMigrations()`.

```TypeScript
await dbLayer.runMigrations();  
```


### Initialize the Models

Pass an initialization function for loading up all your models.

```TypeScript
import User from '../models/User';

// ...

await dbLayer.initialize(async (sequelize: Sequelize) => {
  // ensure User.init is invoked in load implementation
  User.load(sequelize);
});
```

Models are used like normal after initialization.

```TypeScript
import User from '../models/User';

// ...

await User.findOne({ where: { id } });
```



---

### Start up a database for testing

You can use docker to stand up a new postgres db from scratch for testing with.

```
docker run -it --name pg-db \
    -e POSTGRES_USER=tmp_user \
    -e POSTGRES_PASSWORD=tmp_pass \
    -e POSTGRES_DB=tmp_db \
    -p 5432:5432 \
    -d \
    postgres:9.5
```

You can kill the container with `docker kill pg-db` once your done.

## db-facade

[![npm](https://img.shields.io/npm/v/db-facade?logo=npm)](https://www.npmjs.com/package/db-facade)

Boiler-plate code and thin wrapper for [sequelize](https://www.npmjs.com/package/sequelize) and [umzug](https://www.npmjs.com/package/umzug) packages.

```
npm i --save db-facade sequelize umzug
```

---

### Connect

```TypeScript
import path from 'path';
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


### Run Migrations

Run the umzug migrations by simply calling `runMigrations()`.

```TypeScript
await dbLayer.runMigrations();  
```


### Initialize Models

Pass an initialization function for loading up all your models.

```TypeScript
import { Sequelize } from 'sequelize';
import User from '../models/User';
import Post from '../models/Post';

// ...

await dbLayer.initialize(async (sequelize: Sequelize) => {
  User.init({ /* ... */ });
  Post.init({ /* ... */ });

  User.hasMany(Post, {
    sourceKey: 'id',
    foreignKey: 'creatorId'
  });
  Post.belongsTo(User, { targetKey: 'id' });
});
```

Models are used like normal after initialization.

```TypeScript
import User from '../models/User';

// ...

await User.findOne({ where: { id } });
```



---

### Examples

See [here](./examples/) for examples using other dialects.

### Running Examples


Make sure you install dependencies in the root folder.

```
cd ./db-layer-ts
npm install
```

#### Start a dev database

We'll need a database to connect to and test against. We can use docker to quickly stand up a new db from scratch.

Postgres docker example:

```
docker run -it --name pg-db \
    -e POSTGRES_USER=dev \
    -e POSTGRES_PASSWORD=dev \
    -e POSTGRES_DB=dev \
    -p 5432:5432 \
    -d \
    postgres:9.5
```

MySql docker example:

```
docker run -it --name mysql-db \
    -e MYSQL_ROOT_PASSWORD=dev \
    -e MYSQL_USER=dev \
    -e MYSQL_PASSWORD=dev \
    -e MYSQL_DATABASE=dev \
    -p 3306:3306 \
    -d \
    mysql:5.7.25
```

#### Run the build script

```
cd ./examples
./build.sh
```

This creates a `dist` folder inside of examples and some symlinks to entrypoint files.


#### Run the example


Postgres example:

```
node ./test-postgres
```

MySql example:

```
node ./test-mysql
```

#### View the data

Postgres

```
# shell into the container
docker exec -it pg-db /bin/bash

# view tables
psql -U dev -d dev -c '\dt'

# view migration rows
psql -U dev -d dev -c 'select * from pg_migrations'
```

MySql

```
# shell into the container
docker exec -it mysql-db /bin/bash

# enter mysql prompt
mysql

# view tables
mysql> show tables;

# view the user rows
mysql> select * from users;
```

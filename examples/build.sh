#!/bin/bash

rm -rf ./dist || true;
rm ./test-mysql || true;
rm ./test-postgres || true;

../node_modules/.bin/tsc -p .

cp -R ./test-migrations ./dist/examples/mysql/
cp -R ./test-migrations ./dist/examples/postgres/

ln -s `pwd`/dist/examples/mysql/MysqlEx.js `pwd`/test-mysql
ln -s `pwd`/dist/examples/postgres/PostgresEx.js `pwd`/test-postgres

echo 'try one of the following..';
echo;
echo 'node ./test-mysql'
echo 'node ./test-postgres'
echo;

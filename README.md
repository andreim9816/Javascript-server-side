# Javascript-server-side

``` code 
npm install
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
npx sequelize-cli db:migrate
npx sequelize-cli seed:generate --name demo-users
npx sequelize-cli seed:all
```

After initializing sequelize, you have to change the config.json content to:
``` code
{
  "development": {
    "dialect": "sqlite",
    "storage": "storage/db.sqlite"
  }
}
```

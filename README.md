# Javascript-server-side

## Installing node_modules:
``` code 
npm install
```

## Initiate sequelize
``` code
npx sequelize-cli init
```

## Create database table
``` code
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
```

## Create migration
``` code
npx sequelize-cli db:migrate
```

## Generate seeder js 
``` code
npx sequelize-cli seed:generate --name demo-users
```

## Populate database
``` code
npx sequelize-cli db:seed:all
```

## Config change to
``` code
{
  "development": {
    "dialect": "sqlite",
    "storage": "storage/db.sqlite"
  }
}
```

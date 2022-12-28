# Cheatz v2

Version 2 of the Cheatz app. Made for demonstrational purposes.

The backend is written in node.js using the express web application framework.

## Resources

### Database

- Postgres and sqLite
- [Knex.js Guide](https://knexjs.org/guide/)

#### Migrations

Install knex both locally `npm i knex` and globally for easier access `npm i -g knex`

 ```bash
   $ knex migrate:make <name> --knexfile=./src/db/knexfile.js      # create migration
   $ knex migrate:latest --knexfile=./src/db/knexfile.js           # migrate the latest
   $ knex migrate:up --knexfile=./src/db/knexfile.js               # run all migrations not already run
   $ knex migrate:rollback --knexfile=./src/db/knexfile.js         # rollback latest migration
   $ knex migrate:rollback --all  --knexfile=./src/db/knexfile.js  # rollback all migrations
 `

### Generic

- [Mdn](https://developer.mozilla.org/en-US/)


### Logging

- [Winston](https://github.com/winstonjs/winston)
- [Winston Daily Rotate File](https://github.com/winstonjs/winston-daily-rotate-file#readme)

### Utils

- [Date-fns date functions](https://date-fns.org/)
- [Mailtrap](https://mailtrap.io/inboxes)
- Nodemailer

### Validation

- [Validator.js](https://github.com/validatorjs/validator.js)
- [Express Validators](https://express-validator.github.io/docs/)

### View Handling

- [Express Handlebars](https://github.com/express-handlebars/express-handlebars)
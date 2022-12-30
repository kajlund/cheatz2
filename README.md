# Cheatz v2

Version 2 of the Cheatz app. Made for demonstrational purposes.

The backend is written in node.js using the express web application framework.

## Resources

### Database

- Postgres using [Prisma](https://www.prisma.io/)

```bash
npm i prisma
# Create schema
npx prisma init

# prototyping push changes directly
npx prisma db push

# Create initial migration
npx prisma migrate dev --name init
```

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

### View Handling

- [Express Handlebars](https://github.com/express-handlebars/express-handlebars)
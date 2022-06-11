# Project Groupomania - Front

This project is part of the 7th and last project of the Openclassroom's Web Developer formation

## Setup

For this project to work you'll need to install and run it before installing the [Project Groupomania - Front](https://github.com/Eyfie/groupomania-front) part of it.

## Installation

After cloning the project, and going in the created folder, you will need a package manager, like NPM to install it by running the command
```
npm install
```
## Configuration

### Database setup

- First of all you will need to change the `src/config/config.example.json` into `src/config/config.json`.
- Create your MySQL database en fill the development part of `config.json`

Now you can run your server with one of the two following
```
nodemon server
node server
```
It will fill your database with all the tables necessary.

You can now stop your server running and go in the src file and run the following npx command to create your demo-users :
```
cd src
npx sequelize-cli db:seed:all
cd ..
```

### SMTP setup

Now that we've got our database I invite you to create an account on [mailtrap](https://mailtrap.io/).

- Once created get into your inbox and go on SMTP settings.
- Pick Nodemailer in the Integration list and save your user, pass and port. We will need them in the next step.


### Env setup

You will need to change the  `.env.example` file into `.env` and set it up with the data you got from the previous step and your secret keys for the tokens.
Don't worry about MAIL it's just the mockup mail that will send you your recovery mail.

```
REFRESH_TOKEN_SECRET=YourSecretKey
ACCESS_TOKEN_SECRET=YourOtherSecretKey

USER_SMTP=user
PWD_SMTP=pass
PORT_SMTP=port
MAIL=support@yourmailservice.com
```

## Project follow up

You're all set up, you can now safely go see [Project Groupomania - Front](https://github.com/Eyfie/groupomania-front) to install it and run both back and front to navigate the app


### `nodemon server` or  `node server`

Run the server on the port 3001 in development mode.



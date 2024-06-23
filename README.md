# Project Setup Guide

This guide covers the setup process for both the backend and mobile parts of the project.

## Backend Setup

### Environment Variables

1. Copy the `.env.example` file in the `backend` directory to a new file named `.env`.
2. Fill in the required environment variables in the `.env` file. like your database URL, JWT secret, etc.

### Running the Backend

1. Navigate to the `backend` directory.
2. Install the dependencies by running:
   ```sh
   npm install
   ```
3. Push the database schema by running:
   ```sh
   npx prisma db push
   ```
4. Generate Prisma client by running:
   ```sh
   npx prisma generate
   ```
5. Start the backend server by running:
   ```sh
    npm run dev
    ```
6. The backend server should now be running on `http://localhost:8000`.

## Mobile Setup

# Changing the IP Address
Open the `mobile/lib/axios.config.js` file.
Change the `IP_ADDRESS` variable to your local IP address. This is necessary for the mobile app to communicate with the backend.

# Environment Variables
There are no specific environment variables to set up for the mobile part, but ensure that the `backend's IP address` is correctly set as mentioned above.

# Running the Mobile App
1. Navigate to the `mobile` directory.
2. Install the dependencies by running:
   ```sh
   npm install
   ```
3. Start the mobile app by running:
   ```sh
    npx expo start
    ```

# Working with Prisma

prisma is a modern database toolkit that makes it easy to work with databases in your application. It provides an ORM (Object-Relational Mapping) layer that allows you to interact with your database using a type-safe API.

## Prisma Schema

The Prisma schema is a declarative file that defines your database schema. It describes the data model, relationships, and constraints of your database.

The schema is defined in the `schema.prisma` file in the `backend` directory. It uses Prisma's own schema language to define the data model.

## Updating the Schema

To update the schema in Prisma, follow these steps:

1. Open the `schema.prisma` file in the `backend` directory.
2. Make the necessary changes to the schema.
3. Save the file.

## Formatting the Schema

To format the schema in Prisma, you can use the `prisma format` command. Run the following command in the terminal:

```sh
npx prisma format
```

This command will automatically format the schema file according to Prisma's formatting rules.

## Prisma Client

The Prisma client is an auto-generated library that provides a type-safe and convenient way to interact with your database. It allows you to perform CRUD operations and execute complex queries.

To generate the Prisma client, run the following command in the terminal:

```sh
npx prisma generate
```

This command will generate the Prisma client based on your schema definition.

## Syncing with the Database

To sync your Prisma schema with the database, use the `prisma db push` command. This command will apply any pending migrations and update the database schema accordingly.

Run the following command in the terminal:

```sh
npx prisma db push
```

## Happy coding! 🚀
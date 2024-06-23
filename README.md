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

***Happy coding!*** 🚀
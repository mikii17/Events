# Backend using NestJS

This repository contains the backend for your application, built with NestJS. NestJS is a powerful and extensible Node.js framework that allows you to build scalable and maintainable server-side applications.

## Getting Started

1. **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create the .env file:**
    Use the following command to create a .env file based on the provided .env.example template:
    ```bash
    cp .env.example .env
    ```

    Edit the newly created .env file to set the necessary environment variables.

4. **Run the application:**
    ```bash
    npm run start:dev
    ```
    The application will be accessible at `http://localhost:3000`. 

## Environment Variables

Ensure that you set the required environment variables in the .env file. Refer to the .env.example file for the expected variables and their descriptions.

## Scripts

- **Run development server:**
    ```bash
    npm run start:dev
    ```

- **Run production server:**
    ```bash
    npm run start:prod
    ```


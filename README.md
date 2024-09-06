# URL Shortener - NestJS Application

This is a URL shortener application built with NestJS, using PostgreSQL as the database, and Docker for easy environment setup and execution.

## Prerequisites

Ensure you have the following installed:

- Node.js (version 20.17 LTS or higher)
- Yarn (or npm)
- Docker and Docker Compose

## Installation

### 1. Cloning the repository

Clone the repository to your local environment:

```bash
git clone https://github.com/gitjhonatan/gitjhonatan-teste-teddy-open-finance.git
cd gitjhonatan-teste-teddy-open-finance
```

### 2. Installing dependencies

Install the application dependencies with Yarn or npm:

```bash
yarn install
# or
npm install
```

### 3. Environment configuration

Create a `.env` file in the root of the project with the following variables:

```env
APP_URL=http://localhost:3000
DB_PORT=5432
DB_HOST=localhost
DB_DATABASE=postgres
DB_USER=postgres
DB_PASS=postgres
JWT_SECRET=yoursecrethere
```

### 4. Setting up the database with Docker

Docker is used to set up the PostgreSQL database and PgAdmin. Use Docker Compose to bring up the database and PgAdmin containers:

```bash
docker-compose up -d
```

### 5. Running database migrations

After setting up the database, run the database migrations to ensure the tables are properly set up:

```bash
npm run migration:run
```

## Running the application

### 1. Running locally

To run the application locally, execute:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Running tests

To run the application tests, use the command:

```bash
npm test
```

## Technologies used

- **Node.js 20.17**
- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **Docker and Docker Compose**
- **PgAdmin**

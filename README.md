# Running shoes tracker 
### with React + Vite, Docker, and MySql

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express-black?logo=express)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)
![Docker Compose](https://img.shields.io/badge/Orchestration-Docker--Compose-2496ED?logo=docker)

This web application allows users to add and view a list of running shoes, including details like brand, model, and distance. It consists of a React (React.js + Vite) frontend for interacting with the app, a Node.js backend API for handling requests, and a MySQL database for storing the data. All parts run in separate Docker containers. 

---

## Prerequisites

Before you begin, make sure you have the following installed and properly configured on your machine:

- [Node.js](https://nodejs.org/) (v16 or newer)
- npm (comes bundled with Node.js)
- [Docker](https://www.docker.com/get-started) and Docker Compose installed and running
- [Visual Studio Code](https://code.visualstudio.com/) (optional, but recommended for development)


## File structure overview

```bash
/client
│
├── node_modules/                 # Installed frontend dependencies
├── public/                       # Static assets (images, favicon, etc.)
├── src/                          # React source files
│   ├── components/   
      ├── AddShoesForm.css        
      ├── AddShoeForm.jsx
      ├── HomePage.css
      ├── HomePage.jsx
      ├── ShoesList.css
      └── ShoeList.jsx
    ├── App.css  
    ├── App.jsx                   # Main React component
    ├── index.css
│   └── main.jsx                  # React entry point
├── .env                          # Environment variables (not committed)
├── .gitignore                    # Git ignore rules
├── Dockerfile                    # Dockerfile for frontend container
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point at root of client
├── package-lock.json             # Exact dependency tree (auto-generated)
├── package.json                  # React project dependencies and scripts
└── vite.config.js                # Vite configuration

/server
│
├── controllers/                  # Controller logic 
    └── shoesController.js
├── db/
    └── connection.js
├── models/                       # Database models    
    └── shoesModel.js
├── node_modules/                 # Installed backend dependencies
├── routes/                       # API route handlers
    └── shoes.js
├── Dockerfile                    # Dockerfile for backend container       
├── index.js                      # Main Express server file    
├── package-lock.json             # Exact dependency tree (auto-generated)         
└── package.json                  # Backend dependencies and scripts                 

/.env                             # Environment variables (not committed)

/.gitignore                       # Git ignore rules

/docker-compose.yml               # Docker compose configuration

/README.md                        # Readme file 
```

## Setup Instructions

### 1. Create project folders

Create the main folders for the client, server, and database initialization:

```bash
mkdir client server db
```

### 2. Create React app with Vite in the client folder

Use Vite to scaffold the React app:

```bash
npm create vite@latest client -- --template react
```

### 3. Install React dependencies and run the development server

Navigate to the client folder, install dependencies, and start the React dev server:

```bash
cd client
npm install
npm run dev
```

This will start the app at http://localhost:5173.

### 4. Initialize Node.js backend in the server folder

Navigate to the server folder and initialize a new Node.js project:

```bash
cd server
npm init -y
```

### 5. Install backend dependencies

Install Express, CORS, dotenv, and MySQL client libraries:

```bash
npm install express cors dotenv mysql2
```

### 6. Create an Express server
Create an index.js file inside the server folder and set up your basic server and database connection.

### 7. Run the backend server locally

Start the backend server by running:

```bash
node index.js
```

## Docker Setup

### 8. Create Dockerfiles for client and server

Create a `Dockerfile` inside the `/server` folder:

```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```
Create a `Dockerfile` inside the `/client` folder:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 9. Create a `docker-compose.yml` file in the project root
```yaml
services:
  db:
    image: mysql:8.0
    container_name: mysql-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  server:
    build: ./server
    container_name: node-server
    restart: always
    ports:
      - "5000:5000"
    environment:
      DB_HOST: mysql-db
      DB_USER: ${MYSQL_USER}
      DB_PASSWORD: ${MYSQL_PASSWORD}
      DB_NAME: ${MYSQL_DATABASE}
    depends_on:
      - db

  client:
    build: ./client
    container_name: react-client
    restart: always
    ports:
      - "3000:80"
    depends_on:
      - server

volumes:
  db_data:
```
## Example `.env` file

```env
# MySQL environment variables for docker-compose
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=dbname
MYSQL_USER=user
MYSQL_PASSWORD=dbpassword

# Server environment variables
DB_HOST=mysql-db
DB_USER=user
DB_PASSWORD=password
DB_NAME=dbname
```
> ⚠️ **Note:** Replace these values with your own credentials. Do **not** commit your actual `.env` file to the repository.

### 10. Run all containers
To run the entire application (frontend, backend, and MySQL database) in Docker containers with proper networking, follow these steps:

1. Ensure your `.env` file contains the correct database credentials matching those in `docker-compose.yml`.

2. From the root directory of the project (where `docker-compose.yml` is located), run:

```bash
docker-compose up --build
```

3. This will:
- Build and start all services (database, backend, and frontend);
- Set up an internal Docker network, allowing the backend to connect to the MySQL container using the hostname `mysql-db`;
- Expose the frontend on http://localhost:3000 and the backend API on http://localhost:5000.

4. You can now interact with the app and test API routes like:

GET
```bash
curl http://localhost:5000/api/shoes
```
POST 
```bash
curl -X POST http://localhost:5000/api/shoes \
  -H "Content-Type: application/json" \
  -d '{ "key1": "value1", "key2": "value2" }'
```

UPDATE by ID
```bash
curl -X PUT http://localhost:5000/api/shoes/{id} \
  -H "Content-Type: application/json" \
  -d '{ "key1": "newValue1", "key2": "newValue2" }'
```

DELETE by ID 
```bash
curl -X DELETE http://localhost:5000/api/shoes/{id}
```

> ⚠️ **Note:** Running the backend server locally without Docker will result in a connection error because the hostname `mysql-db` is only resolvable inside the Docker network.
> If you want to run the backend locally, replace the hostname `mysql-db` in your environment variables with `localhost` or the appropriate address of your MySQL server.

- React app will be available at: http://localhost:3000
- Backend API will run on: http://localhost:5000
- MySQL port exposed at 3306 for database tools

## API Endpoints

| Method | Endpoint          | Description                   | Request Body Example                                            |
|--------|-------------------|-------------------------------|-----------------------------------------------------------------|
| GET    | `/api/shoes`      | Get list of all shoes         | N/A                                                             |
| POST   | `/api/shoes`      | Add a new shoe                | `{ "brand": "Nike", "model": "Air Max", "distance": 100 }`      |
| PUT    | `/api/shoes/{id}` | Update shoe info by ID        | `{ "brand": "Adidas", "model": "Ultraboost", "distance": 150 }` |
| DELETE | `/api/shoes/{id}` | Delete shoe by ID             | N/A                                                             |

## Usage 

After running the application (either locally or via Docker), open your web browser and navigate to: http://localhost:3000

On the app, you can:
- Add new running shoes by entering details like brand, model, and distance;
- View the list of all running shoes you've added;
- Track your running shoe mileage conveniently from the interface.

The frontend communicates with the backend API to save and fetch shoe data, ensuring your running shoes list is always up to date.

## Technical Choices

- **Frontend**: Built with React and Vite for fast development and hot module reloading;
- **Backend**: Developed using Node.js and Express for handling RESTful API routes;
- **Database**: MySQL was chosen for structured relational data storage;
- **Containerization**: Docker was used to ensure consistent environments for all services, and Docker Compose was used to simplify orchestration;
- **Communication**: The backend connects to the MySQL container using internal Docker networking, and the frontend communicates with the API server via HTTP;
- **Build tools**: Vite (React) and NGINX (for static frontend hosting) were chosen for fast build times and production-ready delivery.

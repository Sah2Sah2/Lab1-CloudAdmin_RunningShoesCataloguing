# Running shoes tracker with React + Vite, Docker, and MySql

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express-black?logo=express)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)
![Docker Compose](https://img.shields.io/badge/Orchestration-Docker--Compose-2496ED?logo=docker)

This web application allows users to add and view a list of running shoes, including details like brand, model, and distance. It consists of a React (React.js + Vite) frontend for interacting with the app, a Node.js backend API for handling requests, and a MySQL database for storing the data. All parts run in separate Docker containers. 

---

## File strucutre overview

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
├── .env                          # Enviroment variables (not committed)
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
Create an index.js file inside the server folder and set up your basic server and database connection

...

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
### 10. Run all containers
Run the following command in your project root to build and start all services:
```bash
docker-compose up --build
```

- React app will be available at: http://localhost:3000
- Backend API will run on: http://localhost:5000
- MySQL port exposed at 3306 for database tools

## Technical Choices

- **Frontend**: Built with React and Vite for fast development and hot module reloading;
- **Backend**: Developed using Node.js and Express for handling RESTful API routes;
- **Database**: MySQL was chosen for structured relational data storage;
- **Containerization**: Docker was used to ensure consistent environments for all services, and Docker Compose was used to simplify orchestration;
- **Communication**: The backend connects to the MySQL container using internal Docker networking, and the frontend communicates with the API server via HTTP;
- **Build tools**: Vite (React) and NGINX (for static frontend hosting) were chosen for fast build times and production-ready delivery.

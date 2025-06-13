# ReactDockerMySql

This project is a full-stack web application using React, Node.js, and MySQL, all running in Docker containers.  

---

## File strucutre overview

```bash
/client
│
├── node_modules/           # Installed frontend dependencies
├── public/                 # Static assets (images, favicon, etc.)
├── src/                    # React source files
│   ├── components/         # React components
│   ├── App.jsx             # Main React component
│   └── main.jsx            # React entry point
├── Dockerfile              # Dockerfile for frontend container
├── index.html              # HTML entry point at root of client
├── eslint.config.js        # ESLint configuration
├── package-lock.json       # Exact dependency tree (auto-generated)
├── package.json            # React project dependencies and scripts
├── vite.config.js          # Vite configuration
└── .gitignore              # Git ignore rules

/server
│
├── node_modules/           # Installed backend dependencies
├── index.js                # Main Express server file
├── Dockerfile              # Dockerfile for backend container
├── routes/                 # API route handlers (if any)
├── controllers/            # Controller logic 
├── models/                 # Database models 
├── package.json            # Backend dependencies and scripts
└── .env                    # Environment variables (not committed)

 /db
│
└── init.sql                # SQL scripts to initialize the database 
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
version: "3.9"

services:
  db:
    image: mysql:8.0
    container_name: mysql-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: user
      MYSQL_PASSWORD: password
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
      DB_HOST: db
      DB_USER: user
      DB_PASSWORD: password
      DB_NAME: mydatabase
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
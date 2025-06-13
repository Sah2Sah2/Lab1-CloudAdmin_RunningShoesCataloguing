# Use official Node.js image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the server source code
COPY . .

# Expose the port your server listens on
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]

FROM node:20-alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy current directory contents into the container at /app
COPY . .

# Command to run on the container start
CMD ["npm", "run", "start:dev"]

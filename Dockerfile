# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the app
RUN npm run build

# Expose port 3000 for the app to be accessible
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
# Use an official node image as a parent image
FROM node:22-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and install dependencies
COPY ./*.json ./
RUN npm install

# Copy the current directory contents into the container at /app
COPY .. .

RUN npm run build

# Expose the port React runs on
EXPOSE 8080

# Command to start the React app
CMD ["npm", "run", "dev"]

# Use the official Node.js image as the base image
FROM node:20.18.0-alpine

# Set the working directory
WORKDIR /app


# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Command to serve the application
# CMD ["npm", "run", "dev", "--", "--port", "5000"]
CMD ["serve", "-s", "-l", "5000", "./dist"]
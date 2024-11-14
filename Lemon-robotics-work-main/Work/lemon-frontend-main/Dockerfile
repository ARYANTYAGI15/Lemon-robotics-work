# Use the official Node.js image to set up the environment
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Set a longer timeout as an environment variable
ENV NPM_CONFIG_FETCH_TIMEOUT=1000000

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port Vite will use (5173)
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]

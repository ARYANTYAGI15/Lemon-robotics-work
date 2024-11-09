# Step 1: Use an official Node.js image as a build environment
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy dependency files and install dependencies
COPY package*.json ./
RUN npm config set timeout 1000000 && npm install || npm install || npm install

RUN npm cache clean --force
RUN npm install

# Copy source code
COPY . .

# Build the React app (output should go to the `dist` folder)
RUN npm run build

# Step 2: Use an official NGINX image to serve the app
FROM nginx:alpine

# Copy built React app to NGINX HTML directory (use `dist` instead of `build` if applicable)
COPY --from=build /app/dist /usr/share/nginx/html  

# Copy custom NGINX configuration, if you have one
# Ensure you have nginx.conf in the current directory, or remove this line if not needed
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]

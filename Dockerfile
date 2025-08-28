# Stage 1: Build the Angular application
FROM node:22-alpine AS build

# Set working directory inside the container to match your project structure
WORKDIR /app/sources

# Copy package configuration files
COPY sources/package.json .
COPY sources/package-lock.json* .

# Install dependencies, mirroring the command from your GitHub workflow
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY sources/ .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine

# Copy the build output from the 'build' stage to the Nginx html directory.
# The output path is typically 'dist/<project-name>/browser'.
# Please verify 'gender-utikalauz/browser' is the correct output folder inside 'dist'.
COPY --from=build /app/sources/dist/browser /usr/share/nginx/html

# Copy the custom Nginx configuration for the Angular app
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

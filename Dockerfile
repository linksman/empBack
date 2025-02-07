# Use Node.js official image
FROM --platform=linux/amd64 node:23.3.0

# Set working directory inside the container
WORKDIR ./app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose the port
EXPOSE 5000

# Run the server
ENTRYPOINT ["node", "app.js"]



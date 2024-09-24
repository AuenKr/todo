FROM node:slim

RUN apt-get update -y && apt-get install -y openssl

RUN npm install -g bun

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY ./prisma ./

# Install dependencies
RUN bun install
RUN bun run db:client

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN bun run build

# Expose the port the Next.js app listens on
EXPOSE 3000

# Start the Next.js app
CMD ["bun", "run", "docker:start"]
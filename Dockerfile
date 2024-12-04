# Node JS Version
FROM node:20

# Working Directory
WORKDIR /

# Copy file package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all code source
COPY . .

# Expose port
EXPOSE 8080
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
FROM node:16.14
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install -qy
# Copy app to docker container
COPY . .
CMD ["npm", "run", "start"]

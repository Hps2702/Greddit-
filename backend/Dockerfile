FROM node:16.14
# Set working directory
WORKDIR /usr/app
# Install required app dependencies 
COPY package*.json ./
RUN npm install -qyg nodemon@2.0.7
RUN npm install -qy
# Copy app to docker container
COPY . .

CMD ["npm", "run", "dev"]

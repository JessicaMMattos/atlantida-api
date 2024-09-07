FROM node:18
WORKDIR /atlantida-api
COPY . .
RUN npm install
ENTRYPOINT npm start
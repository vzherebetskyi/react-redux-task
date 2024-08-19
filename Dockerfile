# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
ENV REACT_APP_NEWS_API_KEY=*** \
    REACT_APP_GUARDIAN_API_KEY=*** \
    REACT_APP_NYT_API_KEY=***
CMD ["npm", "start"]

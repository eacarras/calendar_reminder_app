FROM node:12.0-alpine as develop-stage
WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY . .

# Build stage
FROM develop-stage as build-stage
RUN yarn build

# Production stage
FROM nginx:1.15.7-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
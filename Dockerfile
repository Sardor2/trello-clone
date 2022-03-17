FROM node:16 as webdeps
RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

FROM node:16 as build
RUN mkdir /app
WORKDIR /app
COPY --from=webdeps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM nginx:latest
COPY --from=build /app/build/* /usr/share/nginx/html/
RUN mkdir /usr/share/nginx/html/static
RUN mv /usr/share/nginx/html/js /usr/share/nginx/html/static/js
RUN mv /usr/share/nginx/html/css /usr/share/nginx/html/static/css
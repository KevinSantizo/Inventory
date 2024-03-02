FROM amd64/node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM amd64/nginx:stable-alpine as production-stage
#FROM nginx
#COPY nginx.conf /etc/.nginx/conf.d/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


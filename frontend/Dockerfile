# Build stage
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
# Ajoute TypeScript explicitement (utile pour CI/CD)
RUN npm install --save-dev typescript
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
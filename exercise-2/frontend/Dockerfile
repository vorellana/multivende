FROM node:18-alpine

# Define las variables de entorno como argumentos de construcción
ARG VITE_WHAREHOUSE_ID
ARG VITE_MERCHANT_ID
ARG VITE_CLIENT_ID
ARG VITE_CLIENT_SECRET
ARG VITE_BASE_URL

# Establece las variables de entorno para la construcción
ENV VITE_WHAREHOUSE_ID=$VITE_WHAREHOUSE_ID
ENV VITE_MERCHANT_ID=$VITE_MERCHANT_ID
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_CLIENT_SECRET=$VITE_CLIENT_SECRET
ENV VITE_BASE_URL=$VITE_BASE_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]


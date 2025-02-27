FROM node:20.12.2-alpine
WORKDIR /neraime_frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
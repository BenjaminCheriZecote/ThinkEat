FROM node:20
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
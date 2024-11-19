WORKDIR /app
COPY package.json ./
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
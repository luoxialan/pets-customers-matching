FROM node:latest
EXPOSE 3000
RUN mkdir /app
COPY . /app
WORKDIR /app
# RUN npm install && npm cache clean --force
RUN npm install
CMD ["npm", "run", "build"]
# CMD npm run start
FROM node:carbon

WORKDIR /parse
COPY package*.json ./

RUN npm install
# RUN npm install --only=production

RUN npm install pm2 -g

COPY . .
EXPOSE 1337

CMD ["pm2-docker", "start", "process.json"]

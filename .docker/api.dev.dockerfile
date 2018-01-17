FROM node:latest

ENV NODE_ENV=development

# CMD ["npm", "run", "dev"]
#CMD ["./initialize.sh"]
FROM node:latest

MAINTAINER Rodrigo Cipriani da Rosa

ENV NODE_ENV=development PORT=5000

COPY ./api /home/app
WORKDIR /home/app

EXPOSE $PORT

RUN npm install
#RUN npm run dev:build

CMD ["npm", "run", "dev"]
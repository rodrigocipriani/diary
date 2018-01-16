# todo's
# - use npm-shrinkwrap.json
# - Clear / and /client unused node_modules after build

FROM node:latest

# home app dir
ARG HOME=/home/app
#ENV HOME=${HOME}

RUN useradd --user-group --create-home --shell /bin/false app

RUN mkdir -p ${HOME}
COPY . ${HOME}
RUN chown -R app:app ${HOME}/*

USER app

WORKDIR ${HOME}

RUN npm i

EXPOSE 5000

# CMD [ "node bundle.js" ]
CMD [ "npm", "run", "dev" ]